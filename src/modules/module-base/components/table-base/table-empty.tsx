/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableRow } from '@module-base/components/table';

export function TableEmpty(
    props: Pick<App.ModuleBase.Component.TableBaseProps<App.ModuleBase.Component.TableData>, 'loading' | 'emptyContent'>
) {
    const { loading, emptyContent } = props;

    if (loading) return null;

    if (!emptyContent || typeof emptyContent === 'string' || typeof emptyContent === 'number') {
        return (
            <TableRow className={cn('absolute inset-0', 'flex items-center justify-center')}>
                <span className="opacity-50">{emptyContent || 'No data!'}</span>
            </TableRow>
        );
    }

    return <TableRow className={cn('absolute inset-0', 'flex items-center justify-center')}>{emptyContent}</TableRow>;
}
