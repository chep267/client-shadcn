/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';
import { enableMapSet } from 'immer';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { deepGet } from '@module-base/utils/data';
import { deepIncludes, normalizeString } from '@module-base/utils/string';
import { debounce } from '@module-base/utils/debounce';
import { delay } from '@module-base/utils/delay';
import { sortTableData } from '@module-base/utils/virtual';

type TableStoreProps<Data extends App.ModuleBase.Component.TypeTableData> =
    App.ModuleBase.Component.TableStoreProps<Data>;

enableMapSet();

export const createTableStore = <Data extends App.ModuleBase.Component.TypeTableData>() => {
    return create<TableStoreProps<Data>>((set, get) => ({
        data: {
            loading: false,
            hasCheckbox: false,
            dataKeyForCheckbox: 'id',
            isCheckedAll: false,
            isIndeterminate: false,
            searchKey: '',
            orderBy: 'id',
            orderType: OrderType.asc,
            selectedIds: new Set(),
            emptyContent: null,
            columns: [],
            items: [],
            delayLoading: AppTimer.searching,
            filters: undefined,
            searchableKeys: undefined,
            currentItems: [],
        },
        action: {
            initState: (initialData: Partial<TableStoreProps<Data>['data']>) => {
                set(
                    produce<TableStoreProps<Data>>(({ data }) => {
                        Object.entries(initialData).forEach(([key, value]) => {
                            if (key in data) {
                                (data as Record<typeof key, unknown>)[key] = value;
                            }
                            data.items = data.items || [];
                            data.currentItems = data.items;
                        });
                    })
                );
            },
            setParam: (key, value) => {
                set(
                    produce<TableStoreProps<Data>>(({ data }) => {
                        if (key in data) {
                            (data as Record<typeof key, unknown>)[key] = value;
                        }
                    })
                );
            },
            toggleRow: (id) => {
                set(
                    produce<TableStoreProps<Data>>(({ data }) => {
                        if (data.selectedIds.has(id)) {
                            data.selectedIds.delete(id);
                        } else {
                            data.selectedIds.add(id);
                        }
                        const total = data.currentItems.length;
                        const selected = data.selectedIds.size;
                        data.isCheckedAll = total > 0 && selected === total;
                        data.isIndeterminate = selected > 0 && selected < total;
                    })
                );
            },
            toggleAll: () => {
                set(
                    produce<TableStoreProps<Data>>(({ data }) => {
                        data.isIndeterminate = false;
                        if (data.isCheckedAll) {
                            data.isCheckedAll = false;
                            data.selectedIds = new Set();
                        } else {
                            const ids = data.currentItems.map((item) => deepGet(item, data.dataKeyForCheckbox));
                            data.isCheckedAll = true;
                            data.selectedIds = new Set(ids);
                        }
                    })
                );
            },
            sort: (dataKey, type) => {
                set(
                    produce((state) => {
                        const nextOrderBy = dataKey || state.data.orderBy;
                        const nextOrderType =
                            type ||
                            (nextOrderBy !== state.data.orderBy || state.data.orderType === OrderType.desc
                                ? OrderType.asc
                                : OrderType.desc);
                        state.data.orderBy = nextOrderBy;
                        state.data.orderType = nextOrderType;
                    })
                );
                get().action.calculateData(true);
            },
            search: (text = '') => {
                set(
                    produce((state) => {
                        state.data.searchKey = text;
                    })
                );
                get().action.calculateData();
            },
            filter: (filters) => {
                set(
                    produce((state) => {
                        state.data.filters = filters;
                    })
                );
                get().action.calculateData();
            },
            calculateData: (() => {
                const runCalculation = (isImmediate = false) => {
                    const { data, action } = get();
                    const { items, searchKey, searchableKeys, filters, orderBy, orderType, delayLoading } = data;

                    const timingStart = performance.now();
                    if (isImmediate) {
                        action.setParam('loading', true);
                    }

                    // --- STEP 1: Search ---
                    let result = [...items];
                    const normalized = normalizeString(searchKey.trim());
                    if (normalized) {
                        result = result.filter((item) => deepIncludes(item, normalized, searchableKeys));
                    }

                    // --- STEP 2: Filter ---
                    if (filters?.length) {
                        result = result.filter((item) =>
                            filters.every(({ dataKey, value, fnFilter }) => {
                                if (typeof fnFilter === 'function') return fnFilter(item);
                                return deepGet(item, dataKey) === value;
                            })
                        );
                    }

                    // --- STEP 3: Sort ---
                    result = sortTableData({
                        items: result,
                        orderBy,
                        orderType,
                    });

                    // --- STEP 4: Update State with Delay UX ---
                    const duration = performance.now() - timingStart;
                    const remainingTime = isImmediate ? Math.max(0, (delayLoading || 0) - duration) : 0;

                    delay(remainingTime).then(() => {
                        set(
                            produce((state) => {
                                state.data.currentItems = result;
                                state.data.loading = false;
                                // Re-calculate the checkbox status based on a new list
                                const selected = state.data.selectedIds.size;
                                const total = result.length;
                                state.data.isCheckedAll = total > 0 && selected === total;
                                state.data.isIndeterminate = selected > 0 && selected < total;
                            })
                        );
                    });
                };

                const debouncedCalc = debounce(() => runCalculation(), AppTimer.searching);

                return (isImmediate = false) => {
                    if (isImmediate) {
                        debouncedCalc.cancel();
                        runCalculation(true);
                    } else {
                        get().action.setParam('loading', true);
                        debouncedCalc();
                    }
                };
            })(),
        },
    }));
};
