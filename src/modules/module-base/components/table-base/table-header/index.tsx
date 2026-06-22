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

    const action = store((state) => state.action);
    const columns = store((state) => state.data.columns);
    const orderBy = store((state) => state.data.orderBy);
    const orderType = store((state) => state.data.orderType);

    return (
        <TableHeaderUI className={cn('sticky top-0 z-10', 'bg-background shadow-border shadow-sm', className)}>
            <TableRow className={cn('group', 'h-12')}>
                <TableCellCheckboxAll store={store} />
                {columns?.map((column) => {
                    const isOrderBy = orderBy === column.dataKey;
                    return (
                        <TableHeaderCell
                            key={column.dataKey}
                            column={column}
                            isOrderBy={isOrderBy}
                            orderType={isOrderBy ? orderType : undefined}
                            sort={action.sort}
                        />
                    );
                })}
            </TableRow>
        </TableHeaderUI>
    );
}
