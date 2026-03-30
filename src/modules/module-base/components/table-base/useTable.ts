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

export function useTable<Data extends App.ModuleBase.Component.TableData>(payload: {
    items: Data[];
    dataKeyForCheckbox?: string;
    delayLoading?: number;
    searchableKeys?: string[];
    searchValue?: string;
    orderBy?: string;
    orderType?: App.ModuleBase.Component.OrderType;
    filters?: { dataKey: string; value: string }[];
}) {
    const {
        items,
        dataKeyForCheckbox = 'id',
        delayLoading = AppTimer.delay,
        searchableKeys,
        searchValue: searchValueProps = '',
        orderBy: orderByProps = dataKeyForCheckbox,
        orderType: orderTypeProps = OrderType.asc,
        filters,
    } = payload;

    const [loading, setLoading] = React.useState(false);
    const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(() => new Set());
    const [sortConfig, setSortConfig] = React.useState({
        searchValue: '',
        orderBy: orderByProps,
        orderType: orderTypeProps,
    });
    const [isPending, startTransition] = React.useTransition();

    const hookValueRef = React.useRef({
        dataKeyForCheckbox,
        sortConfig,
        selectedIds,
        delayLoading,
        searchableKeys,
        currentItems: items,
        timingStart: 0,
    });

    const startLoading = React.useCallback(() => {
        hookValueRef.current.timingStart = performance.now();
        setLoading(true);
    }, []);

    const currentItems = React.useMemo(() => {
        // filter items
        let filteredItems = items;
        const searchValue = sortConfig.searchValue.trim();
        if (searchValue) {
            const normalizedSearchValue = normalizeString(searchValue);
            filteredItems = items.filter((item) => deepIncludes(item, normalizedSearchValue, searchableKeys));
        }
        if (filters?.length) {
            filteredItems = filteredItems.filter((item) =>
                filters.every(({ dataKey, value }) => item[dataKey] === value)
            );
        }

        // sort items
        return sortTableData({
            items: filteredItems,
            orderType: sortConfig.orderType,
            orderBy: sortConfig.orderBy,
        });
    }, [items, sortConfig.orderBy, sortConfig.orderType, sortConfig.searchValue, searchableKeys, filters]);

    const onToggleRow = React.useCallback((item: Data) => {
        setSelectedIds((prevIds) => {
            const id = item[hookValueRef.current.dataKeyForCheckbox];
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
                hookValueRef.current.currentItems.map((item) => item[hookValueRef.current.dataKeyForCheckbox])
            );
        });
    }, []);

    const isSelected = React.useCallback((id: string | number) => {
        return hookValueRef.current.selectedIds.has(id);
    }, []);

    const onSort = React.useCallback((orderBy?: string, orderType?: App.ModuleBase.Component.OrderType) => {
        startLoading();
        startTransition(() => {
            setSortConfig((prev) => {
                if (!!orderBy && !!orderType) {
                    return {
                        ...prev,
                        orderBy,
                        orderType,
                    };
                }

                const newOrderBy = orderBy || prev.orderBy;
                const newOrderType =
                    newOrderBy !== prev.orderBy || prev.orderType === OrderType.desc ? OrderType.asc : OrderType.desc;
                return {
                    ...prev,
                    orderBy: newOrderBy,
                    orderType: newOrderType,
                };
            });
        });
    }, []);

    const debounceSearch = React.useMemo(() => {
        return debounce((searchValue) => {
            startTransition(() => {
                setSortConfig((prev) => ({ ...prev, searchValue }));
            });
        }, AppTimer.delay);
    }, []);

    const onSearch = React.useCallback((searchValue: string) => {
        debounceSearch.cancel();
        startLoading();
        debounceSearch(searchValue);
    }, []);

    React.useLayoutEffect(() => {
        hookValueRef.current.dataKeyForCheckbox = dataKeyForCheckbox;
        hookValueRef.current.delayLoading = delayLoading;
        hookValueRef.current.sortConfig = sortConfig;
        hookValueRef.current.selectedIds = selectedIds;
        hookValueRef.current.currentItems = currentItems;
    }, [dataKeyForCheckbox, sortConfig, selectedIds, currentItems, delayLoading]);

    React.useEffect(() => {
        onSearch(searchValueProps);
    }, [searchValueProps]);

    React.useEffect(() => {
        onSort(orderByProps, orderTypeProps);
    }, [orderByProps, orderTypeProps]);

    React.useEffect(() => {
        const duration = performance.now() - hookValueRef.current.timingStart;
        const remainingTime = Math.max(0, Math.abs(duration - hookValueRef.current.delayLoading));

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
