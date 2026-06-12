/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { type VirtuosoHandle, Virtuoso } from 'react-virtuoso';

/** constants */
import { AppTimer, OrderType } from '@module-base/constants/config';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { delay } from '@module-base/utils/delay';
import { createTableStore } from '@module-base/components/table-base/utils/table-store';

/** components */
import { ListLoading } from '@module-base/components/virtual-list/list-loading';
import { ListEmpty } from '@module-base/components/virtual-list/list-empty';

export function VirtualList<Data extends App.ModuleBase.Component.TypeTableData>(
    props: App.ModuleBase.Component.ListProps<Data>
) {
    const { className, initialSetup, items, emptyContent, ...listProps } = props;
    const {
        loading,
        hasCheckbox = false,
        delayLoading = AppTimer.searching,
        dataKeyForCheckbox = 'id',
        searchKey = '',
        orderBy = '',
        orderType = OrderType.asc,
        filters,
        searchableKeys,
    } = initialSetup ?? {};

    const virtuoso = React.useRef<VirtuosoHandle>(null);
    const listStore = React.useMemo(() => createTableStore<Data>(), []);
    const currentItems = listStore((state) => state.data.currentItems);
    const storeOrderBy = listStore((state) => state.data.orderBy);
    const storeOrderType = listStore((state) => state.data.orderType);

    React.useEffect(() => {
        listStore.getState().action.initState({
            loading,
            hasCheckbox,
            dataKeyForCheckbox,
            delayLoading,
            searchKey,
            orderBy,
            orderType,
            items,
            filters,
            searchableKeys,
            emptyContent,
        });
    }, [listStore, loading, hasCheckbox, dataKeyForCheckbox, delayLoading, items]);

    React.useEffect(() => {
        listStore.getState().action.search(searchKey);
    }, [searchKey]);

    React.useEffect(() => {
        listStore.getState().action.sort(orderBy, orderType);
    }, [orderBy, orderType]);

    React.useEffect(() => {
        listStore.getState().action.filter(filters);
    }, [JSON.stringify(filters)]);

    React.useEffect(() => {
        delay(delayLoading).then(() => {
            virtuoso.current?.scrollTo({ top: 0 });
        });
    }, [searchKey, storeOrderBy, storeOrderType, JSON.stringify(filters), JSON.stringify(searchableKeys)]);

    return (
        <div className={cn('relative h-full w-full', className)}>
            <ListLoading store={listStore} />
            <ListEmpty store={listStore} />
            <Virtuoso
                ref={virtuoso}
                className={cn('h-full w-full', 'scrollbar-custom scrollbar-thin')}
                data={currentItems}
                {...listProps}
            />
        </div>
    );
}
