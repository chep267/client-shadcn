/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import AppHeader from '@module-global/components/AppHeader';
import AppMain from '@module-global/components/AppMain';

/** utils */
import { cn } from '@module-base/utils/shadcn';

export default function MainScreen() {
    return (
        <div className={cn('relative', 'flex flex-col', 'min-h-dvh w-full')}>
            <AppHeader />
            <AppMain />
        </div>
    );
}
