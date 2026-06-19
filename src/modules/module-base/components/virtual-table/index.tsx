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
    const { className, setup, items, emptyContent, columns } = props;

    const virtuoso = React.useRef<TableVirtuosoHandle>(null);
    const dataStore = React.useMemo(() => createBigdataStore<Data>(), []);

    const action = dataStore((state) => state.action);
    const currentItems = dataStore((state) => state.data.currentItems);
    const isTableEmpty = currentItems.length === 0;

    const components = React.useMemo<TableComponents<Data>>(() => {
        return {
            Table: Table,
            TableHead: (props) => <Slot.Root {...props} />,
            TableRow: TableRow,
            TableBody: (props) => {
                return <TableBody {...props} store={dataStore} />;
            },
        };
    }, []);

    React.useEffect(() => {
        action.init({
            ref: virtuoso.current,
            items,
            emptyContent,
            columns,
            ...setup,
        });
    }, [items, emptyContent, columns, JSON.stringify(setup)]);

    return (
        <div
            className={cn(
                'relative flex-1 overflow-hidden rounded-sm border',
                'min-h-40',
                { 'max-h-40': isTableEmpty },
                className
            )}
        >
            <TableLoading store={dataStore} />
            {React.useMemo(() => {
                return (
                    <TableVirtuoso
                        ref={virtuoso}
                        className={cn(
                            'relative h-full w-full',
                            '**:data-[slot=table-container]:overflow-visible',
                            className
                        )}
                        components={components}
                        data={currentItems}
                        fixedHeaderContent={() => {
                            return <TableHeader store={dataStore} />;
                        }}
                        itemContent={(indexRow, item) => {
                            return <TableBodyRow asChild indexRow={indexRow} item={item} store={dataStore} />;
                        }}
                    />
                );
            }, [className, currentItems])}
        </div>
    );
}
