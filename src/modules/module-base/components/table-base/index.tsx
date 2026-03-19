/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useTableBase } from '@module-base/components/table-base/useTableBase';

/** components */
import { Table } from '@module-base/components/table';
import { TableBaseHeader } from '@module-base/components/table-base/table-header';
import { TableBaseBody } from '@module-base/components/table-base/table-body';
import { TableLoading } from '@module-base/components/table-base/table-loading';
import { cn } from '@module-base/utils/shadcn';

export function TableBase<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseProps<Data>
) {
    const {
        className,
        headerClassName,
        bodyClassName,
        loading,
        hasCheckbox,
        dataKeyForCheckbox,
        columns,
        items = [],
    } = props;

    const {
        loading: sortLoading,
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

    return (
        <div className={cn('relative rounded-md border', className)}>
            <TableLoading loading={loading || sortLoading} />
            <Table className={className}>
                <TableBaseHeader
                    className={headerClassName}
                    hasCheckbox={hasCheckbox}
                    columns={columns}
                    checked={indeterminate ? 'indeterminate' : checkedAll}
                    onSelect={toggleAll}
                    onSort={onSort}
                />
                <TableBaseBody
                    className={bodyClassName}
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
