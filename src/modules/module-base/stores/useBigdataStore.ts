/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';
import debounce from 'lodash-es/debounce';

/** constants */
import { AppTimer, OrderType } from '@module-base/constants/config';

/** utils */
import { deepIncludes, normalizeString } from '@module-base/utils/string';
import { sortBigdata, getNestedValue } from '@module-base/utils/virtual';

enableMapSet();
const NUMBER_ITEM_THRESHOLD_LOADING = 200;

export const createBigdataStore = <Data>() => {
    return create<App.ModuleBase.Component.BigdataStore<Data>>((set, get) => ({
        data: {
            // state
            element: undefined,
            loading: false,
            isCheckedAll: false,
            isIndeterminate: false,
            searchKey: '',
            orderBy: undefined,
            orderType: undefined,
            selectedIds: new Set(),

            // setup
            hasCheckbox: false,
            dataKeyForCheckbox: 'id',
            searchableKeys: undefined,
            filters: undefined,

            // data
            columns: undefined,
            emptyContent: undefined,
            items: undefined,
            currentItems: [],
        },
        action: {
            setup: (initialData: Partial<App.ModuleBase.Component.BigdataStore<Data>['data']>) => {
                const isImmediate = !initialData.searchKey && !initialData.filters?.length;
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        Object.assign(data, initialData);
                        data.loading = !isImmediate;
                    })
                );
                get().action.calculateData(isImmediate);
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
                            data.selectedIds.clear();
                        } else {
                            const ids = data.currentItems.map(
                                (item) => getNestedValue(item, data.dataKeyForCheckbox) as string
                            );
                            data.isCheckedAll = true;
                            data.selectedIds = new Set(ids);
                        }
                    })
                );
            },
            sort: (orderBy, orderType) => {
                const {
                    action: { calculateData },
                    data: { currentItems },
                } = get();
                const isImmediate = currentItems.length < NUMBER_ITEM_THRESHOLD_LOADING;

                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        const nextOrderType =
                            orderType ||
                            (orderBy !== data.orderBy
                                ? OrderType.asc
                                : !data.orderType || data.orderType === OrderType.asc
                                  ? OrderType.desc
                                  : OrderType.asc);

                        data.orderBy = orderBy as typeof data.orderBy;
                        data.orderType = nextOrderType;
                        data.loading = !isImmediate;
                    })
                );
                calculateData(isImmediate);
            },
            search: (value = '') => {
                const {
                    action: { calculateData },
                    data: { searchKey },
                } = get();
                const nextSearchKey = value.trim();

                if (nextSearchKey === searchKey) {
                    return;
                }

                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        data.searchKey = nextSearchKey;
                        data.loading = true;
                    })
                );
                calculateData();
            },
            filter: (filters) => {
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        data.filters = filters as typeof data.filters;
                        data.loading = true;
                    })
                );
                get().action.calculateData();
            },
            calculateData: (() => {
                const process = () => {
                    const {
                        element,
                        items = [],
                        searchKey,
                        searchableKeys,
                        filters = [],
                        orderBy,
                        orderType,
                    } = get().data;
                    const normalizedQuery = normalizeString(searchKey);
                    let nextItems = items;

                    if (normalizedQuery || filters.length) {
                        // filter & search logic
                        nextItems = items.filter((item) => {
                            // filter logic
                            const isMatchFilter = filters.every((filter) => {
                                if (typeof filter.fnFilter === 'function') {
                                    return filter.fnFilter(item);
                                }
                                const val = normalizeString(`${getNestedValue(item, filter.dataKey)}`);
                                return val.includes(normalizeString(filter.value));
                            });

                            if (!isMatchFilter) return false;

                            // search logic
                            if (searchableKeys?.length) {
                                return searchableKeys.some((key) => {
                                    return normalizeString(`${getNestedValue(item, key)}`).includes(normalizedQuery);
                                });
                            }
                            return deepIncludes(item, normalizedQuery);
                        });
                    }

                    if (orderBy) {
                        // sort logic
                        nextItems = sortBigdata({ items: nextItems, orderBy, orderType });
                    }

                    set(
                        produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                            const total = nextItems.length ?? 0;
                            const selected = data.selectedIds.size ?? 0;
                            data.isCheckedAll = total > 0 && selected >= total;
                            data.isIndeterminate = selected > 0 && selected < total;
                            data.currentItems = nextItems as typeof data.currentItems;
                            data.loading = false;
                        })
                    );
                    element?.scrollTo({ top: 0 });
                };

                const debouncedProcess = debounce(process, AppTimer.searching);

                return (isImmediate) => {
                    debouncedProcess.cancel();
                    if (isImmediate) {
                        process();
                        return;
                    }
                    debouncedProcess();
                };
            })(),
        },
    }));
};
