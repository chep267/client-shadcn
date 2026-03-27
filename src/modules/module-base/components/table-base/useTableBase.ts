/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** utils */
import { sortTableData } from '@module-base/utils/virtual';

export function useTableBase<Data extends App.ModuleBase.Component.TableData>(payload: {
    items: Data[];
    dataKeyForCheckbox?: string;
}) {
    const { items, dataKeyForCheckbox = 'id' } = payload;

    const [selectedIds, setSelectedIds] = React.useState<Set<Data[string]>>(() => new Set());
    const [isPending, startTransition] = React.useTransition();
    const [sortConfig, setSortConfig] = React.useState({
        orderBy: dataKeyForCheckbox,
        orderType: OrderType.asc as App.ModuleBase.Component.OrderType,
    });

    const hookValueRef = React.useRef({
        dataKeyForCheckbox,
        sortConfig,
        selectedIds,
        currentItems: items,
        timingStart: 0,
    });

    const currentItems = React.useMemo(() => {
        return sortTableData({
            items,
            ...sortConfig,
        });
    }, [items, sortConfig]);

    const toggleRow = React.useCallback((item: Data) => {
        setSelectedIds((prevIds) => {
            const id = item[hookValueRef.current.dataKeyForCheckbox];
            const nextIds = new Set(prevIds);

            if (nextIds.has(id)) nextIds.delete(id);
            else nextIds.add(id);
            return nextIds;
        });
    }, []);

    const toggleAll = React.useCallback(() => {
        setSelectedIds((prev) => {
            if (prev.size === hookValueRef.current.currentItems.length) {
                return new Set();
            }
            return new Set(
                hookValueRef.current.currentItems.map((item) => item[hookValueRef.current.dataKeyForCheckbox])
            );
        });
    }, []);

    const isSelected = React.useCallback((id: Data[string]) => {
        return hookValueRef.current.selectedIds.has(id);
    }, []);

    const onSort = React.useCallback((dataKey?: string) => {
        const nextOrderBy = dataKey || hookValueRef.current.dataKeyForCheckbox;
        startTransition(() => {
            setSortConfig((prev) => {
                if (prev.orderBy === nextOrderBy) {
                    return {
                        ...prev,
                        orderType: prev.orderType === OrderType.asc ? OrderType.desc : OrderType.asc,
                    };
                }
                return { orderBy: nextOrderBy, orderType: OrderType.asc };
            });
        });
    }, []);

    React.useEffect(() => {
        hookValueRef.current.dataKeyForCheckbox = dataKeyForCheckbox;
        hookValueRef.current.sortConfig = sortConfig;
        hookValueRef.current.selectedIds = selectedIds;
        hookValueRef.current.currentItems = currentItems;
    }, [dataKeyForCheckbox, sortConfig, selectedIds, currentItems]);

    const total = currentItems.length;
    const selected = selectedIds.size;
    const checkedAll = selected > 0 && selected === total;
    const indeterminate = selected > 0 && selected < total;

    return {
        loading: isPending,
        ...sortConfig,
        currentItems,
        selectedIds,
        selectedCount: selected,
        checkedAll,
        indeterminate,
        toggleRow,
        toggleAll,
        isSelected,
        onSort,
    };
}
