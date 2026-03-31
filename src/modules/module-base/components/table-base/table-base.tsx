/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { useTable } from '@module-base/components/table-base/useTable';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Table } from '@module-base/components/table';
import { TableHeader } from '@module-base/components/table-base/table-header';
import { TableBody } from '@module-base/components/table-base/table-body';
import { TableLoading } from '@module-base/components/table-base/table-loading';

export function TableBase<Data extends App.ModuleBase.Component.TypeTableData>(
    props: App.ModuleBase.Component.TableProps<Data>
) {
    const { className, initialSetup, initialValue, columns, items = [], emptyContent } = props;
    const { hasCheckbox = false, dataKeyForCheckbox = 'id', delayLoading } = initialSetup ?? {};
    const { searchValue = '', orderBy: orderByProps, orderType: orderTypeProps } = initialValue ?? {};

    const elemContainer = React.useRef<HTMLDivElement | null>(null);

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
    });

    React.useEffect(() => {
        elemContainer.current?.querySelector('[data-slot="table-container"]')?.scrollTo({ top: 0 });
    }, [orderBy, orderType]);

    return (
        <div ref={elemContainer} className={cn('relative h-full w-full rounded-md border', className)}>
            <TableLoading loading={loading} />
            <Table className={className}>
                <TableHeader
                    hasCheckbox={hasCheckbox}
                    orderType={orderType}
                    orderBy={orderBy}
                    columns={columns}
                    checked={indeterminate ? 'indeterminate' : checkedAll}
                    onSelect={onToggleAll}
                    onSort={onSort}
                />
                <TableBody
                    loading={loading}
                    hasCheckbox={hasCheckbox}
                    dataKeyForCheckbox={dataKeyForCheckbox}
                    columns={columns}
                    items={currentItems}
                    emptyContent={emptyContent}
                    selectedIds={selectedIds}
                    onSelect={onToggleRow}
                />
            </Table>
        </div>
    );
}
