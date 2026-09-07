/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { AppHeader } from '@module-global/components/AppHeader';
import { AppMain } from '@module-global/components/AppMain';
import { AppSocket } from '@module-global/components/AppSocket';

export default function MainScreen() {
    return (
        <div className={cn('relative', 'flex flex-col', 'h-dvh w-dvw')}>
            <AppHeader />
            <AppMain />
            <AppSocket />
        </div>
    );
}
