/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

export function ListEmpty<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.ComponentWithBigdataStoreProps<Data>
) {
    const { store } = props;

    const isEmpty = store((state) => state.data.currentItems.length === 0);
    const loading = store((state) => state.data.loading);
    const emptyContent = store((state) => state.data.emptyContent);

    if (loading || !isEmpty) return null;

    if (!emptyContent || typeof emptyContent === 'string' || typeof emptyContent === 'number') {
        return (
            <div className={cn('absolute inset-0', 'flex items-center justify-center')}>
                <span className="opacity-50">{emptyContent || 'No data!'}</span>
            </div>
        );
    }

    return (
        <div className={cn('absolute inset-0', 'flex items-center justify-center')}>
            {typeof emptyContent === 'function' ? emptyContent() : emptyContent}
        </div>
    );
}
