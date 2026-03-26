/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Slot } from 'radix-ui';
import { type TableComponents, TableVirtuoso } from 'react-virtuoso';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Table, TableBody, TableRow } from '@module-base/components/table';
import { useTableBase } from '@module-base/components/table-base/useTableBase';
import { TableBaseHeader } from '@module-base/components/table-base/table-header';
import { TableBodyRow } from '@module-base/components/table-base/table-body-row';
import { TableLoading } from '@module-base/components/table-base/table-loading';

export function VirtualTable<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseProps<Data>
) {
    const { className, loading, hasCheckbox, dataKeyForCheckbox = 'id', columns, items = [] } = props;

    const {
        loading: sortLoading,
        orderType,
        orderBy,
        currentItems,
        checkedAll,
        indeterminate,
        selectedIds,
        toggleRow,
        toggleAll,
        onSort,
    } = useTableBase({
        items,
        dataKeyForCheckbox,
    });

    const components: TableComponents<Data> = {
        Scroller: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
            <div ref={ref} {...props}>
                <TableLoading loading={loading || sortLoading} />
                {children}
            </div>
        )),
        Table: Table,
        TableHead: (props) => <Slot.Root {...props} />,
        TableRow: TableRow,
        TableBody: TableBody,
    };

    const fixedHeaderContent = () => {
        return (
            <TableBaseHeader
                hasCheckbox={hasCheckbox}
                orderType={orderType}
                orderBy={orderBy}
                columns={columns}
                checked={indeterminate ? 'indeterminate' : checkedAll}
                onSelect={toggleAll}
                onSort={onSort}
            />
        );
    };

    const itemContent = (indexRow: number, item: Data) => {
        const checked = hasCheckbox && dataKeyForCheckbox ? selectedIds.has(item[dataKeyForCheckbox]) : false;
        return (
            <TableBodyRow
                asChild
                key={item[dataKeyForCheckbox]}
                indexRow={indexRow}
                hasCheckbox={hasCheckbox}
                checked={checked}
                columns={columns}
                item={item}
                onSelect={toggleRow}
            />
        );
    };

    return (
        <TableVirtuoso
            className={cn(
                'relative h-full w-full rounded-md border',
                '[&_[data-slot=table-container]]:overflow-visible',
                className
            )}
            components={components}
            data={currentItems}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
        />
    );
}
