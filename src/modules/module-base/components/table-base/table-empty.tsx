/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableRow, TableHead } from '@module-base/components/table';

export function TableEmpty<
    Data extends App.ModuleBase.Component.TypeTableData = App.ModuleBase.Component.TypeTableData,
>(props: App.ModuleBase.Component.TableEmptyProps<Data>) {
    const { store } = props;

    const isTableEmpty = store((state) => state.data.currentItems.length === 0);
    const loading = store((state) => state.data.loading);
    const emptyContent = store((state) => state.data.emptyContent);

    if (loading || !isTableEmpty) return null;

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
