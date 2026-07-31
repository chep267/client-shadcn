/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ArrowUpDown } from 'lucide-react';

/** constants */
import { OrderType } from '@module-base/constants/config';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';
import { TableHead } from '@module-base/components/table';

export function TableHeaderCell<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableHeaderCellProps<Data>
) {
    const { column, store } = props;

    const action = store((state) => state.action);
    const orderBy = store((state) => state.data.orderBy);
    const orderType = store((state) => state.data.orderType);
    const isOrderBy = orderBy === column.dataKey;

    return (
        <TableHead className={column.className}>
            {column.sortable ? (
                <Button
                    data-order-by={isOrderBy}
                    data-order-type={isOrderBy ? orderType : undefined}
                    className={cn('group cursor-pointer px-0 has-[>svg]:px-0', 'hover:bg-transparent!')}
                    variant="ghost"
                    size="sm"
                    onClick={() => action.sort(column.dataKey)}
                >
                    {typeof column.label === 'function' ? column.label() : column.label}
                    <ArrowUpDown
                        className={cn(
                            'h-4 w-4',
                            'group-data-[order-by=false]:text-muted',
                            `group-data-[order-type=${OrderType.asc}]:[&_path:nth-child(-n+2)]:text-muted`,
                            `group-data-[order-type=${OrderType.desc}]:[&_path:nth-last-child(-n+2)]:text-muted`
                        )}
                    />
                </Button>
            ) : typeof column.label === 'function' ? (
                column.label()
            ) : (
                column.label
            )}
        </TableHead>
    );
}
