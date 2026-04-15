/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Slot } from 'radix-ui';
import { TableVirtuoso, type TableComponents, type TableVirtuosoHandle } from 'react-virtuoso';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { deepGet } from '@module-base/utils/data';
import { delay } from '@module-base/utils/delay';

/** stores */
import { createTableStore } from '@module-base/components/table-base/utils/table-store';

/** components */
import { Table, TableRow } from '@module-base/components/table';
import { TableHeader } from '@module-base/components/table-base/table-header';
import { TableBodyRow } from '@module-base/components/table-base/table-body-row';
import { TableLoading } from '@module-base/components/table-base/table-loading';
import { TableBody } from '@module-base/components/table-base/table-body';

export function VirtualTable<Data extends App.ModuleBase.Component.TypeTableData>(
    props: App.ModuleBase.Component.TableProps<Data>
) {
    const { className, initialSetup, columns, items, emptyContent } = props;
    const {
        hasCheckbox = false,
        delayLoading = AppTimer.searching,
        dataKeyForCheckbox = 'id',
        searchKey = '',
        orderBy = dataKeyForCheckbox,
        orderType = OrderType.asc,
        filters,
        searchableKeys,
    } = initialSetup ?? {};

    const virtuoso = React.useRef<TableVirtuosoHandle>(null);
    const tableStore = React.useMemo(() => createTableStore<Data>(), []);

    const currentItems = tableStore((state) => state.data.currentItems);
    const storeOrderBy = tableStore((state) => state.data.orderBy);
    const storeOrderType = tableStore((state) => state.data.orderType);
    const isTableEmpty = currentItems.length === 0;

    const components = React.useMemo<TableComponents<Data>>(() => {
        return {
            Table: Table,
            TableHead: (props) => <Slot.Root {...props} />,
            TableRow: TableRow,
            TableBody: (props) => {
                return <TableBody {...props} store={tableStore} />;
            },
        };
    }, [tableStore]);

    const fixedHeaderContent = React.useCallback(() => {
        return <TableHeader store={tableStore} />;
    }, [tableStore]);

    const itemContent = React.useCallback(
        (indexRow: number, item: Data) => {
            const id = deepGet(item, dataKeyForCheckbox) ?? `row-${indexRow}`;
            return <TableBodyRow asChild key={id} id={id} indexRow={indexRow} item={item} store={tableStore} />;
        },
        [tableStore, dataKeyForCheckbox]
    );

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
            virtuoso.current?.scrollTo({ top: 0 });
        });
    }, [searchKey, storeOrderBy, storeOrderType, JSON.stringify(filters), JSON.stringify(searchableKeys)]);

    return (
        <div
            className={cn(
                'relative flex-1 overflow-hidden rounded-md border',
                'min-h-[calc(var(--spacing)*40)]',
                { 'max-h-[calc(var(--spacing)*40)]': isTableEmpty },
                className
            )}
        >
            <TableLoading store={tableStore} />
            {React.useMemo(() => {
                return (
                    <TableVirtuoso
                        ref={virtuoso}
                        className={cn(
                            'relative h-full w-full rounded-md',
                            '[&_[data-slot=table-container]]:overflow-visible',
                            className
                        )}
                        components={components}
                        data={currentItems}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={itemContent}
                    />
                );
            }, [className, currentItems, components, fixedHeaderContent, itemContent])}
        </div>
    );
}
