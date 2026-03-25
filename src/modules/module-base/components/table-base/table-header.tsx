/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ArrowUpDown } from 'lucide-react';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';
import { TableHead, TableHeader, TableRow } from '@module-base/components/table';
import { CellCheckbox } from '@module-base/components/table-base/cell-checkbox';

export function TableBaseHeader<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseHeaderProps<Data>
) {
    const { className, hasCheckbox, orderType, orderBy, checked, columns, onSelect, onSort } = props;

    return (
        <TableHeader className={cn('sticky top-0 z-10', 'bg-background shadow-xs', className)}>
            <TableRow className={cn('h-12', '[&_th:first-child]:rounded-tl-md [&_th:last-child]:rounded-tr-md')}>
                <CellCheckbox
                    component="th"
                    hasCheckbox={hasCheckbox}
                    checked={!!checked}
                    indeterminate={checked === 'indeterminate'}
                    onSelect={onSelect}
                />
                {columns?.map((column) => {
                    return (
                        <TableHead key={column.dataKey} className={cn('', column.className)}>
                            {column.sortable ? (
                                <Button
                                    className={cn('cursor-pointer px-0 has-[>svg]:px-0', 'hover:!bg-transparent')}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onSort?.(column.dataKey)}
                                >
                                    {column.label}
                                    <ArrowUpDown
                                        className={cn('h-4 w-4', {
                                            'text-muted': orderBy !== column.dataKey,
                                            '[&_path:nth-child(-n+2)]:text-muted-foreground':
                                                orderBy === column.dataKey && orderType === OrderType.asc,
                                            '[&_path:nth-last-child(-n+2)]:text-muted-foreground':
                                                orderBy === column.dataKey && orderType === OrderType.desc,
                                        })}
                                    />
                                </Button>
                            ) : (
                                column.label
                            )}
                        </TableHead>
                    );
                })}
            </TableRow>
        </TableHeader>
    );
}
