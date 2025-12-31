/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';

/** components */
import AppHeader from '@module-global/components/AppHeader';
import AppMain from '@module-global/components/AppMain';

export default function MainScreen() {
    return (
        <div className={clsx('relative', 'flex flex-col', 'h-dvh w-dvw')}>
            <AppHeader />
            <AppMain />
        </div>
    );
}
