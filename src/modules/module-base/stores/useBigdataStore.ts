/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

/** constants */
import { AppTimer, OrderType } from '@module-base/constants/config';

/** utils */
import { deepGet } from '@module-base/utils/data';
import { deepIncludes, normalizeString } from '@module-base/utils/string';
import { debounce } from '@module-base/utils/debounce';
import { delay } from '@module-base/utils/delay';
import { sortBigdata } from '@module-base/utils/virtual';

enableMapSet();

export const createBigdataStore = <
    Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata,
>() => {
    return create<App.ModuleBase.Component.BigdataStore<Data>>((set, get) => ({
        data: {
            // state
            ref: undefined,
            loading: false,
            isCheckedAll: false,
            isIndeterminate: false,
            searchKey: '',
            orderBy: '' as App.ModuleBase.Component.BigdataKey<Data>,
            orderType: OrderType.asc,
            selectedIds: new Set(),

            // setup
            delayLoading: AppTimer.searching,
            hasCheckbox: false,
            dataKeyForCheckbox: 'id' as App.ModuleBase.Component.BigdataKey<Data>,
            searchableKeys: [],
            filters: [],

            // data
            columns: [],
            emptyContent: null,
            items: [],
            currentItems: [],
        },
        action: {
            init: (initialData: Partial<App.ModuleBase.Component.BigdataStore<Data>['data']>) => {
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        Object.entries(initialData).forEach(([key, value]) => {
                            if (key in data) {
                                (data as Record<string, unknown>)[key] = value;
                            }
                        });
                        data.items = data.items ?? [];
                        data.currentItems = data.items;
                    })
                );
            },
            setParam: (key, value) => {
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        if (key in data) {
                            (data as Record<string, unknown>)[key] = value;
                        }
                    })
                );
            },
            toggleOne: (id) => {
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
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
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
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
            sort: (orderBy, orderType) => {
                set(
                    produce((state) => {
                        const nextOrderBy = orderBy || state.data.orderBy;
                        const nextOrderType =
                            orderType ||
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
                    const { data } = get();
                    const { items, searchKey, searchableKeys, filters, orderBy, orderType, delayLoading = 0 } = data;
                    const timingStart = performance.now();

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
                    if (orderBy) {
                        result = sortBigdata({
                            items: result,
                            orderBy,
                            orderType,
                        });
                    }

                    // --- STEP 4: Update State with Delay UX ---
                    const duration = performance.now() - timingStart;
                    const remainingTime = isImmediate ? Math.max(0, delayLoading - duration) : 0;

                    delay(remainingTime).then(() => {
                        set(
                            produce((state) => {
                                const total = result.length;
                                const selected = state.data.selectedIds.size;
                                state.data.currentItems = result;
                                state.data.isCheckedAll = total > 0 && selected === total;
                                state.data.isIndeterminate = selected > 0 && selected < total;
                                state.data.loading = false;
                            })
                        );
                        data.ref?.scrollTo({ top: 0 });
                    });
                };

                const debouncedCalc = debounce(() => runCalculation(false), AppTimer.searching);

                return (isImmediate = false) => {
                    const { action } = get();
                    action.setParam('loading', true);
                    if (isImmediate) {
                        debouncedCalc.cancel();
                        runCalculation(true);
                    } else {
                        debouncedCalc();
                    }
                };
            })(),
        },
    }));
};
