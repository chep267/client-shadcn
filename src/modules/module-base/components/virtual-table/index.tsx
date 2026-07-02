/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Slot } from 'radix-ui';
import { TableVirtuoso, type TableComponents, type TableVirtuosoHandle } from 'react-virtuoso';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { createBigdataStore } from '@module-base/stores/useBigdataStore';

/** components */
import { Table, TableRow } from '@module-base/components/table';
import { TableHeader } from '@module-base/components/table-base/table-header';
import { TableBodyRow } from '@module-base/components/table-base/table-body-row';
import { TableLoading } from '@module-base/components/table-base/table-loading';
import { TableBody } from '@module-base/components/table-base/table-body';

export function VirtualTable<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableProps<Data>
) {
    const { ref, className, setup, items, emptyContent, columns, ...otherProps } = props;

    const virtuoso = React.useRef<TableVirtuosoHandle>(null);
    const dataStore = React.useMemo(() => createBigdataStore<Data>(), []);

    const action = dataStore((state) => state.action);
    const currentItems = dataStore((state) => state.data.currentItems);
    const isEmpty = currentItems.length === 0;

    const components = React.useMemo<TableComponents<Data>>(() => {
        return {
            Table: Table,
            TableHead: (props) => <Slot.Root {...props} />,
            TableRow: TableRow,
            TableBody: (props) => <TableBody {...props} store={dataStore} />,
        };
    }, [dataStore]);

    React.useEffect(() => {
        action.setup({
            element: virtuoso,
            items,
            emptyContent,
            columns,
            ...setup,
        });
    }, [items, emptyContent, columns, setup]);

    const fixedHeaderContent = React.useCallback(() => <TableHeader store={dataStore} />, [dataStore]);

    const itemContent = React.useCallback(
        (indexRow: number, item: Data) => {
            return <TableBodyRow asChild indexRow={indexRow} item={item} store={dataStore} />;
        },
        [dataStore]
    );

    React.useImperativeHandle(ref, () => {
        return {
            element: virtuoso,
            action,
        };
    }, []);

    return (
        <div
            className={cn(
                'relative h-full w-full overflow-hidden rounded-sm border',
                'min-h-40',
                { 'max-h-40!': isEmpty },
                className
            )}
        >
            <TableLoading store={dataStore} />
            <TableVirtuoso
                ref={virtuoso}
                className={cn('h-full w-full', '**:data-[slot=table-container]:overflow-visible', className)}
                components={components}
                data={currentItems}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={itemContent}
                {...otherProps}
            />
        </div>
    );
}
