/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableRow, TableHead } from '@module-base/components/table';

export function TableEmpty(props: App.ModuleBase.Component.TableEmptyProps) {
    const { hidden, emptyContent } = props;

    if (hidden) return null;

    if (!emptyContent || typeof emptyContent === 'string' || typeof emptyContent === 'number') {
        return (
            <TableRow className={cn('absolute inset-0', 'flex items-center justify-center')}>
                <TableHead className="flex items-center justify-center opacity-50">
                    {emptyContent || 'No data!'}
                </TableHead>
            </TableRow>
        );
    }

    return (
        <TableRow className={cn('absolute inset-0', 'flex items-center justify-center')}>
            {typeof emptyContent === 'function' ? emptyContent() : emptyContent}
        </TableRow>
    );
}
