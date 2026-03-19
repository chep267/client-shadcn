/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Spinner } from '@module-base/components/spinner';

type TableLoadingProps = Pick<App.ModuleBase.Component.TableBaseProps<App.ModuleBase.Component.TableData>, 'loading'>;

export function TableLoading(props: TableLoadingProps) {
    const { loading } = props;

    if (!loading) return null;

    return (
        <div className={cn('absolute inset-0 z-10', 'flex items-center justify-center', 'bg-muted/50')}>
            <Spinner className={cn('size-6', 'text-main dark:text-white')} />
        </div>
    );
}
