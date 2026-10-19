/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { TableHead } from '@modules/base/components/table';
import { TableHeaderCellSort } from '@modules/base/components/table-base/table-header/table-header-cell-sort';

export function TableHeaderCell<Data>(props: App.Module.Base.Component.TableHeaderCellProps<Data>) {
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
