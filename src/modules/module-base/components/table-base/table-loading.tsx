/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Spinner } from '@module-base/components/spinner';

export function TableLoading<
    Data extends App.ModuleBase.Component.TypeTableData = App.ModuleBase.Component.TypeTableData,
>(props: App.ModuleBase.Component.TableLoadingProps<Data>) {
    const { store } = props;

    const loading = store((state) => state.data.loading);

    if (!loading) return null;

    return (
        <div className={cn('absolute inset-0 z-20', 'right-0 flex items-center justify-center', 'bg-muted/50')}>
            <Spinner className={cn('size-6', 'text-main dark:text-white')} />
        </div>
    );
}
