/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { TableHeader as TableHeaderComp, TableRow } from '@module-base/components/table';
import { TableHeaderCellCheckbox } from '@module-base/components/table-base/table-header/table-header-cell-checkbox';
import { TableHeaderCell } from '@module-base/components/table-base/table-header/table-header-cell';

export function TableHeader<Data>(props: App.ModuleBase.Component.TableHeaderProps<Data>) {
    const { className, store } = props;

    const columns = store((state) => state.data.columns);
    const isEmpty = store((state) => state.data.currentItems.length === 0);

    return (
        <TableHeaderComp
            className={cn('sticky top-0 z-10', 'bg-background shadow-sm', { 'shadow-border': !isEmpty }, className)}
        >
            <TableRow className={cn('h-12')}>
                <TableHeaderCellCheckbox store={store} />
                {columns?.map((column) => {
                    return <TableHeaderCell key={column.dataKey} column={column} store={store} />;
                })}
            </TableRow>
        </TableHeaderComp>
    );
}
