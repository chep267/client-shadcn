/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ArrowUpDown } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableHead, TableHeader, TableRow } from '@module-base/components/table';
import { CellCheckbox } from '@module-base/components/table-base/cell-checkbox';
import { Button } from '@module-base/components/button';

export function TableBaseHeader<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseHeaderProps<Data>
) {
    const { className, hasCheckbox, checked, columns, onSelect, onSort } = props;

    return (
        <TableHeader className={cn('bg-background sticky top-0 z-10', className)}>
            <TableRow className="h-12">
                <CellCheckbox
                    hasCheckbox={hasCheckbox}
                    checked={!!checked}
                    indeterminate={checked === 'indeterminate'}
                    onSelect={onSelect}
                />
                {columns?.map((column) => {
                    return (
                        <TableHead key={column.dataKey} className={cn('', column.className)}>
                            <Button
                                className="cursor-pointer hover:!bg-transparent has-[>svg]:px-0"
                                variant="ghost"
                                size="sm"
                                onClick={() => onSort?.(column.dataKey)}
                            >
                                {column.label}
                                <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>
                    );
                })}
            </TableRow>
        </TableHeader>
    );
}
