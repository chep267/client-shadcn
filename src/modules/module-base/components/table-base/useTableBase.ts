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
import { delay } from '@module-base/utils/delay';

export function useTableBase<Data extends App.ModuleBase.Component.TableData>(payload: {
    items: Data[];
    dataKeyForCheckbox?: App.ModuleBase.Component.DataKey<Data>;
}) {
    const { items, dataKeyForCheckbox = 'id' } = payload;

    const [loading, setLoading] = React.useState(false);
    const [orderType, setOrderType] = React.useState<App.ModuleBase.Component.OrderType>(OrderType.asc);
    const [orderBy, setOrderBy] = React.useState<App.ModuleBase.Component.DataKey<Data>>(dataKeyForCheckbox);
    const [selectedIds, setSelectedIds] = React.useState<Set<Data[App.ModuleBase.Component.DataKey<Data>]>>(
        () => new Set()
    );

    const hookValueRef = React.useRef({
        dataKeyForCheckbox,
        orderType,
        orderBy,
        selectedIds,
        currentItems: items,
        timingStart: 0,
    });

    const currentItems = React.useMemo<Data[]>(() => {
        if (!orderType || !orderBy) {
            return items;
        }
        return sortTableData({ items, orderType, orderBy });
    }, [items, orderType, orderBy]);

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

    const isSelected = React.useCallback((id: Data[App.ModuleBase.Component.DataKey<Data>]) => {
        return hookValueRef.current.selectedIds.has(id);
    }, []);

    const onSort = React.useCallback((nextOrderBy: App.ModuleBase.Component.DataKey<Data>) => {
        setLoading(true);
        hookValueRef.current.timingStart = performance.now();
        delay(1).then(() => {
            if (hookValueRef.current.orderBy === nextOrderBy) {
                return setOrderType((prev) => (prev === OrderType.asc ? OrderType.desc : OrderType.asc));
            }
            setOrderBy(nextOrderBy);
            setOrderType(OrderType.asc);
        });
    }, []);

    React.useEffect(() => {
        const duration = performance.now() - hookValueRef.current.timingStart;
        delay(duration > 300 ? 0 : 300).then(() => setLoading(false));
    }, [currentItems]);

    React.useEffect(() => {
        hookValueRef.current.dataKeyForCheckbox = dataKeyForCheckbox;
        hookValueRef.current.orderType = orderType;
        hookValueRef.current.orderBy = orderBy;
        hookValueRef.current.selectedIds = selectedIds;
        hookValueRef.current.currentItems = currentItems;
    }, [dataKeyForCheckbox, orderType, orderBy, selectedIds, currentItems]);

    const total = currentItems.length;
    const selected = selectedIds.size;
    const checkedAll = selected > 0 && selected === total;
    const indeterminate = selected > 0 && selected < total;

    return {
        loading,
        orderType,
        orderBy,
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
