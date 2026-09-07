/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { Spinner } from '@module-base/components/spinner';

export function TableLoading<Data>(props: App.ModuleBase.Component.ComponentWithBigdataStoreProps<Data>) {
    const { store } = props;

    const loading = store((state) => state.data.loading);

    if (!loading) return null;

    return (
        <div className={cn('absolute inset-0 z-20', 'right-0 flex items-center justify-center', 'bg-muted/50')}>
            <Spinner className={cn('size-6', 'text-main dark:text-white')} />
        </div>
    );
}
