/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { sortTableData } from '@module-base/utils/virtual';
import { deepIncludes, normalizeString } from '@module-base/utils/string';
import { debounce } from '@module-base/utils/debounce';
import { deepGet } from '@module-base/utils/data';

export function useTable<Data extends App.ModuleBase.Component.TypeTableData>(payload: {
    items: Data[];
    dataKeyForCheckbox?: string;
    delayLoading?: number;
    searchableKeys?: string[];
    searchValue?: string;
    orderBy?: string;
    orderType?: App.ModuleBase.Component.TypeOrderType;
    filters?: App.ModuleBase.Component.TypeTableState['filters'];
}) {
    const {
        items,
        dataKeyForCheckbox = 'id',
        delayLoading = AppTimer.delay,
        searchValue = '',
        orderBy = dataKeyForCheckbox,
        orderType = OrderType.asc,
        filters,
        searchableKeys,
    } = payload;

    const [isPending, startTransition] = React.useTransition();
    const [loading, setLoading] = React.useState(true);
    const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(() => new Set());
    const [sortConfig, setSortConfig] = React.useState({
        searchValue,
        orderBy,
        orderType,
        filters,
        searchableKeys,
    });

    const hookValueRef = React.useRef({
        dataKeyForCheckbox,
        sortConfig,
        selectedIds,
        currentItems: items,
        timingStart: 0,
    });

    const startLoading = React.useCallback(() => {
        hookValueRef.current.timingStart = performance.now();
        setLoading(true);
    }, []);

    const onToggleRow = React.useCallback((item: Data) => {
        setSelectedIds((prevIds) => {
            const id = deepGet(item, hookValueRef.current.dataKeyForCheckbox);
            const nextIds = new Set(prevIds);

            if (nextIds.has(id)) nextIds.delete(id);
            else nextIds.add(id);
            return nextIds;
        });
    }, []);

    const onToggleAll = React.useCallback(() => {
        setSelectedIds((prev) => {
            if (prev.size === hookValueRef.current.currentItems.length) {
                return new Set();
            }
            return new Set(
                hookValueRef.current.currentItems.map((item) => deepGet(item, hookValueRef.current.dataKeyForCheckbox))
            );
        });
    }, []);

    const isSelected = React.useCallback((id: string | number) => {
        return hookValueRef.current.selectedIds.has(id);
    }, []);

    const onSort = React.useCallback((dataKey?: string, type?: App.ModuleBase.Component.TypeOrderType) => {
        startLoading();
        startTransition(() => {
            setSortConfig((prev) => {
                if (!!dataKey && !!type) {
                    return {
                        ...prev,
                        orderBy: dataKey,
                        orderType: type,
                    };
                }

                const nextOrderBy = dataKey || prev.orderBy;
                const nextOrderType =
                    nextOrderBy !== prev.orderBy || prev.orderType === OrderType.desc ? OrderType.asc : OrderType.desc;
                return {
                    ...prev,
                    orderBy: nextOrderBy,
                    orderType: nextOrderType,
                };
            });
        });
    }, []);

    const debounceSearch = React.useMemo(() => {
        return debounce((searchValue) => {
            startTransition(() => {
                setSortConfig((prev) => ({ ...prev, searchValue }));
            });
        }, delayLoading);
    }, [delayLoading]);

    const onSearch = React.useCallback(
        (searchValue: string) => {
            debounceSearch.cancel();
            startLoading();
            debounceSearch(searchValue);
        },
        [debounceSearch]
    );

    console.log('filters: ', filters);

    const onFilter = React.useCallback((data?: { dataKey: string; value: string }[]) => {
        startLoading();
        startTransition(() => {
            setSortConfig((prev) => ({ ...prev, filters: data }));
        });
    }, []);

    const currentItems = React.useMemo(() => {
        // filter items
        let filteredItems = items;
        const searchValue = sortConfig.searchValue.trim();
        if (searchValue) {
            const normalizedSearchValue = normalizeString(searchValue);
            filteredItems = items.filter((item) =>
                deepIncludes(item, normalizedSearchValue, sortConfig.searchableKeys)
            );
        }
        if (sortConfig.filters?.length) {
            filteredItems = filteredItems.filter((item) =>
                sortConfig.filters?.every(({ dataKey, value, fnFilter }) => {
                    if (typeof fnFilter === 'function') return fnFilter(item);
                    return deepGet(item, dataKey) === value;
                })
            );
        }

        // sort items
        return sortTableData({
            items: filteredItems,
            orderType: sortConfig.orderType,
            orderBy: sortConfig.orderBy,
        });
    }, [items, sortConfig]);

    React.useLayoutEffect(() => {
        hookValueRef.current.dataKeyForCheckbox = dataKeyForCheckbox;
        hookValueRef.current.sortConfig = sortConfig;
        hookValueRef.current.selectedIds = selectedIds;
        hookValueRef.current.currentItems = currentItems;
    }, [dataKeyForCheckbox, sortConfig, selectedIds, currentItems]);

    React.useEffect(() => {
        if (searchValue !== sortConfig.searchValue) {
            onSearch(searchValue);
        }
    }, [searchValue]);

    React.useEffect(() => {
        if (orderBy !== sortConfig.orderBy || orderType !== sortConfig.orderType) {
            onSort(orderBy, orderType);
        }
    }, [orderBy, orderType]);

    React.useEffect(() => {
        if (filters !== sortConfig.filters) {
            onFilter(filters);
        }
    }, [filters]);

    React.useEffect(() => {
        const duration = performance.now() - hookValueRef.current.timingStart;
        const remainingTime = Math.max(0, delayLoading - duration);

        const timer = setTimeout(() => {
            setLoading(false);
        }, remainingTime);

        return () => clearTimeout(timer);
    }, [currentItems]);

    const total = currentItems.length;
    const selected = selectedIds.size;
    const checkedAll = selected > 0 && selected === total;
    const indeterminate = selected > 0 && selected < total;

    return {
        loading: isPending || loading,
        ...sortConfig,
        isSelected,
        checkedAll,
        indeterminate,
        selectedIds,
        currentItems,
        onToggleRow,
        onToggleAll,
        onSort,
        onSearch,
    };
}
