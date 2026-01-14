/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { BellIcon } from 'lucide-react';

/** components */
import AppInfo from '@module-global/components/AppHeader/AppInfo';
import AppTimer from '@module-global/components/AppHeader/AppTimer';
import AppButtonDev from '@module-global/components/AppHeader/AppButtonDev';
import AppSetting from '@module-global/components/AppHeader/AppSetting';

export default function AppHeader() {
    return (
        <header
            className={clsx(
                'fixed top-0 right-0 left-0 z-(--z-index-header)',
                'flex items-center justify-between',
                'h-(--app-size-height-header) max-h-(--app-size-height-header) min-h-(--app-size-height-header) w-full',
                'border-b px-5 py-0 shadow-lg',
                'text-main bg-white',
                'dark:bg-background dark:text-white'
            )}
        >
            <div className="flex items-center gap-5">
                <AppInfo />
                <AppTimer />
            </div>
            <div className="flex items-center gap-1">
                <AppButtonDev icon={<BellIcon />} />
                <AppSetting />
            </div>
        </header>
    );
}
