/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { AppHeader } from '@module-global/components/AppHeader';
import { AppMain } from '@module-global/components/AppMain';
import { AppSocket } from '@module-global/components/AppSocket';

/** utils */
import { cn } from '@module-base/utils/shadcn';

export default function MainScreen() {
    return (
        <div className={cn('relative', 'flex flex-col', 'h-dvh w-dvw')}>
            <AppHeader />
            <AppMain />
            <AppSocket />
        </div>
    );
}
