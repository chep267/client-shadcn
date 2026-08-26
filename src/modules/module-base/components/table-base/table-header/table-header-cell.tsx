/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { TableHead } from '@module-base/components/table';
import { TableHeaderCellSort } from '@module-base/components/table-base/table-header/table-header-cell-sort';

export function TableHeaderCell<Data>(props: App.ModuleBase.Component.TableHeaderCellProps<Data>) {
    const { column } = props;

    if (!column.sortable) {
        return (
            <TableHead className={column.className}>
                {typeof column.label === 'function' ? column.label() : column.label}
            </TableHead>
        );
    }

    return <TableHeaderCellSort {...props} />;
}
