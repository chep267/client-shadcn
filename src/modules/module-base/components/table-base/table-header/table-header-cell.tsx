/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { ArrowUpDown } from 'lucide-react';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';
import { TableHead } from '@module-base/components/table';

const TableHeaderCell = React.memo(function TableHeaderCell<
    Data extends App.ModuleBase.Component.TypeTableData = App.ModuleBase.Component.TypeTableData,
>(props: App.ModuleBase.Component.TableHeaderCellProps<Data>) {
    const { column, isOrderBy, orderType, sort } = props;

    return (
        <TableHead className={cn(column.className)}>
            {column.sortable ? (
                <Button
                    className={cn('cursor-pointer px-0 has-[>svg]:px-0', 'hover:!bg-transparent')}
                    variant="ghost"
                    size="sm"
                    onClick={() => sort?.(column.dataKey)}
                >
                    {column.label}
                    <ArrowUpDown
                        className={cn('h-4 w-4', {
                            'text-muted': !isOrderBy,
                            '[&_path:nth-child(-n+2)]:text-muted': orderType === OrderType.asc,
                            '[&_path:nth-last-child(-n+2)]:text-muted': orderType === OrderType.desc,
                        })}
                    />
                </Button>
            ) : (
                column.label
            )}
        </TableHead>
    );
});

export { TableHeaderCell };
