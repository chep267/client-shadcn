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

function TableHeaderCell<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableHeaderCellProps<Data>
) {
    const { column, isOrderBy, orderType, sort } = props;

    return (
        <TableHead className={cn(column.className)}>
            {column.sortable ? (
                <Button
                    className={cn('cursor-pointer px-0 has-[>svg]:px-0', 'hover:bg-transparent!')}
                    variant="ghost"
                    size="sm"
                    onClick={() => sort?.(column.dataKey)}
                >
                    {typeof column.label === 'function' ? column.label() : column.label}
                    <ArrowUpDown
                        className={cn('h-4 w-4', {
                            'text-muted': !isOrderBy,
                            '[&_path:nth-child(-n+2)]:text-muted': orderType === OrderType.asc,
                            '[&_path:nth-last-child(-n+2)]:text-muted': orderType === OrderType.desc,
                        })}
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

export { TableHeaderCell };
