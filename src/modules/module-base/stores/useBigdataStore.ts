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
import { debounce } from '@module-base/utils/debounce';
import { deepIncludes, normalizeString } from '@module-base/utils/string';
import { sortBigdata, getNestedValue } from '@module-base/utils/virtual';

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
            orderBy: undefined,
            orderType: undefined,
            selectedIds: new Set(),

            // setup
            hasCheckbox: false,
            dataKeyForCheckbox: undefined,
            searchableKeys: undefined,
            filters: undefined,

            // data
            columns: undefined,
            emptyContent: undefined,
            items: undefined,
            currentItems: [],
        },
        action: {
            init: (initialData: Partial<App.ModuleBase.Component.BigdataStore<Data>['data']> = {}) => {
                const isImmediate = !initialData.searchKey && !initialData.filters?.length;
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        Object.assign(data, initialData);
                        data.loading = !isImmediate;
                    })
                );
                get().action.calculateData(isImmediate);
            },
            setParam: (key, value) => {
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        Object.assign(data, { [key]: value });
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
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        Object.assign(data, {
                            orderBy: orderBy,
                            orderType:
                                orderType ||
                                (orderBy !== data.orderBy
                                    ? OrderType.asc
                                    : !data.orderType || data.orderType === OrderType.asc
                                      ? OrderType.desc
                                      : OrderType.asc),
                        });
                    })
                );
                get().action.calculateData(true);
            },
            search: (text = '') => {
                const isImmediate = !text;
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        data.searchKey = text;
                        data.loading = !isImmediate;
                    })
                );
                get().action.calculateData(isImmediate);
            },
            filter: (filters) => {
                const isImmediate = !filters?.length;
                set(
                    produce<App.ModuleBase.Component.BigdataStore<Data>>(({ data }) => {
                        Object.assign(data, { filters });
                        data.loading = !isImmediate;
                    })
                );
                get().action.calculateData(isImmediate);
            },
            calculateData: (() => {
                const process = () => {
                    const { ref, items = [], searchKey, searchableKeys, filters = [], orderBy, orderType } = get().data;
                    const normalizedQuery = normalizeString(searchKey);
                    let nextItems = items;

                    if (normalizedQuery || filters.length) {
                        // filter & search logic
                        nextItems = items.filter((item) => {
                            // filter logic
                            const isMatchFilter = filters.every((filter) => {
                                if (filter.fnFilter) {
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
                            const total = nextItems.length;
                            const selected = data.selectedIds.size;
                            Object.assign(data, {
                                currentItems: nextItems,
                                isCheckedAll: total > 0 && selected === total,
                                isIndeterminate: selected > 0 && selected < total,
                                loading: false,
                            });
                        })
                    );
                    ref?.scrollTo({ top: 0 });
                };

                const debouncedProcess = debounce(process, AppTimer.searching);

                return (isImmediate) => {
                    debouncedProcess.cancel();
                    if (isImmediate) {
                        process();
                    } else {
                        debouncedProcess();
                    }
                };
            })(),
        },
    }));
};
