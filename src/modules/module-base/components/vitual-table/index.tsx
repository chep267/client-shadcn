/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Slot } from 'radix-ui';
import { type TableComponents, TableVirtuoso } from 'react-virtuoso';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useTable } from '@module-base/components/table-base/useTable';

/** components */
import { Table, TableBody, TableRow } from '@module-base/components/table';
import { TableHeader } from '@module-base/components/table-base/table-header';
import { TableBodyRow } from '@module-base/components/table-base/table-body-row';
import { TableLoading } from '@module-base/components/table-base/table-loading';
import { TableEmpty } from '@module-base/components/table-base/table-empty';

export function VirtualTable<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseProps<Data>
) {
    const { className, initialSetup, initialValue, columns, items = [], emptyContent } = props;
    const { hasCheckbox = false, dataKeyForCheckbox = 'id', delayLoading } = initialSetup ?? {};
    const { searchValue = '', orderBy: orderByProps, orderType: orderTypeProps, filters } = initialValue ?? {};

    const {
        loading,
        orderType,
        orderBy,
        currentItems,
        checkedAll,
        indeterminate,
        selectedIds,
        onToggleRow,
        onToggleAll,
        onSort,
    } = useTable({
        items,
        dataKeyForCheckbox,
        delayLoading,
        searchValue,
        orderBy: orderByProps,
        orderType: orderTypeProps,
        filters,
    });

    const components: TableComponents<Data> = {
        Scroller: ({ children, ...props }) => (
            <div {...props}>
                <TableLoading loading={loading} />
                {children}
            </div>
        ),
        Table: Table,
        TableHead: (props) => <Slot.Root {...props} />,
        TableRow: TableRow,
        TableBody: ({ children, className, ...props }) => (
            <TableBody {...props} className={cn(className, 'relative', { 'h-24': !currentItems.length })}>
                <TableEmpty hidden={loading || currentItems.length > 0} emptyContent={emptyContent} />
                {children}
            </TableBody>
        ),
    };

    const fixedHeaderContent = () => {
        return (
            <TableHeader
                hasCheckbox={hasCheckbox}
                orderType={orderType}
                orderBy={orderBy}
                columns={columns}
                checked={indeterminate ? 'indeterminate' : checkedAll}
                onSelect={onToggleAll}
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
                onSelect={onToggleRow}
            />
        );
    };

    return (
        <TableVirtuoso
            className={cn(
                'relative w-full rounded-md border',
                '[&_[data-slot=table-container]]:overflow-visible',
                { 'max-h-[calc(var(--spacing)*40)]': !currentItems.length },
                className
            )}
            components={components}
            data={currentItems}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
        />
    );
}
