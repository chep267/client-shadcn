/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { useTableBase } from '@module-base/components/table-base/useTableBase';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Table } from '@module-base/components/table';
import { TableBaseHeader } from '@module-base/components/table-base/table-header';
import { TableBaseBody } from '@module-base/components/table-base/table-body';
import { TableLoading } from '@module-base/components/table-base/table-loading';

export function TableBase<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseProps<Data>
) {
    const { className, loading, hasCheckbox, dataKeyForCheckbox, columns, items = [] } = props;

    const elemContainer = React.useRef<HTMLDivElement | null>(null);

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

    React.useEffect(() => {
        elemContainer.current?.querySelector('[data-slot="table-container"]')?.scrollTo({ top: 0 });
    }, [orderBy, orderType]);

    return (
        <div ref={elemContainer} className={cn('relative h-full w-full rounded-md border', className)}>
            <TableLoading loading={loading || sortLoading} />
            <Table className={className}>
                <TableBaseHeader
                    hasCheckbox={hasCheckbox}
                    orderType={orderType}
                    orderBy={orderBy}
                    columns={columns}
                    checked={indeterminate ? 'indeterminate' : checkedAll}
                    onSelect={toggleAll}
                    onSort={onSort}
                />
                <TableBaseBody
                    loading={loading || sortLoading}
                    hasCheckbox={hasCheckbox}
                    dataKeyForCheckbox={dataKeyForCheckbox}
                    columns={columns}
                    items={currentItems}
                    selectedIds={selectedIds}
                    onSelect={toggleRow}
                />
            </Table>
        </div>
    );
}
