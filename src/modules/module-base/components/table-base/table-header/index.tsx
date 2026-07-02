/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableHeader as TableHeaderUI, TableRow } from '@module-base/components/table';
import { TableCellCheckboxAll } from '@module-base/components/table-base/table-cell-checkbox-all';
import { TableHeaderCell } from '@module-base/components/table-base/table-header/table-header-cell';

export function TableHeader<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableHeaderProps<Data>
) {
    const { className, store } = props;

    const columns = store((state) => state.data.columns);
    const isEmpty = store((state) => state.data.currentItems.length === 0);

    return (
        <TableHeaderUI
            className={cn('sticky top-0 z-10', 'bg-background shadow-sm', { 'shadow-border': !isEmpty }, className)}
        >
            <TableRow className={cn('group', 'h-12')}>
                <TableCellCheckboxAll store={store} />
                {columns?.map((column) => {
                    return <TableHeaderCell key={column.dataKey} column={column} store={store} />;
                })}
            </TableRow>
        </TableHeaderUI>
    );
}
