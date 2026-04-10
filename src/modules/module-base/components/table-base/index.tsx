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
import { cn } from '@module-base/utils/shadcn';
import { delay } from '@module-base/utils/delay';

/** stores */
import { createTableStore } from '@module-base/components/table-base/utils/table-store';

/** components */
import { Table } from '@module-base/components/table';
import { TableHeader } from '@module-base/components/table-base/table-header';
import { TableBody } from '@module-base/components/table-base/table-body';
import { TableLoading } from '@module-base/components/table-base/table-loading';

export function TableBase<Data extends App.ModuleBase.Component.TypeTableData>(
    props: App.ModuleBase.Component.TableProps<Data>
) {
    const { className, initialSetup, columns, items = [], emptyContent } = props;
    const {
        hasCheckbox = false,
        delayLoading = AppTimer.searching,
        dataKeyForCheckbox = 'id',
        searchKey,
        orderBy = dataKeyForCheckbox,
        orderType = OrderType.asc,
        filters,
        searchableKeys,
    } = initialSetup ?? {};

    const elemContainer = React.useRef<HTMLDivElement | null>(null);
    const tableStore = React.useMemo(() => createTableStore<Data>(), []);

    const storeOrderBy = tableStore((state) => state.data.orderBy);
    const storeOrderType = tableStore((state) => state.data.orderType);

    React.useEffect(() => {
        tableStore.getState().action.initState({
            hasCheckbox,
            dataKeyForCheckbox,
            delayLoading,
            searchKey,
            orderBy,
            orderType,
            columns,
            items,
            filters,
            searchableKeys,
            emptyContent,
        });
    }, [tableStore, hasCheckbox, dataKeyForCheckbox, delayLoading, columns, items]);

    React.useEffect(() => {
        tableStore.getState().action.search(searchKey);
    }, [searchKey]);

    React.useEffect(() => {
        tableStore.getState().action.sort(orderBy, orderType);
    }, [orderBy, orderType]);

    React.useEffect(() => {
        tableStore.getState().action.filter(filters);
    }, [JSON.stringify(filters)]);

    React.useEffect(() => {
        delay(delayLoading).then(() => {
            elemContainer.current?.querySelector('[data-slot="table-container"]')?.scrollTo({ top: 0 });
        });
    }, [searchKey, storeOrderBy, storeOrderType, JSON.stringify(filters), JSON.stringify(searchableKeys)]);

    return (
        <div ref={elemContainer} className={cn('relative h-full w-full rounded-md border', className)}>
            <TableLoading store={tableStore} />
            <Table className={className}>
                <TableHeader store={tableStore} />
                <TableBody store={tableStore} />
            </Table>
        </div>
    );
}
