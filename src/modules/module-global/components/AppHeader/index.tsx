/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { Bell } from 'lucide-react';

/** components */
import AppInfo from '@module-global/components/AppHeader/AppInfo';
import AppTimer from '@module-global/components/AppHeader/AppTimer';
import AppButtonDev from '@module-global/components/AppHeader/AppButtonDev';
import AppSetting from '@module-global/components/AppHeader/AppSetting';

export default function AppHeader() {
    return (
        <header
            className={clsx(
                'sticky top-0 z-1',
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
            <div className="flex items-center">
                <AppButtonDev icon={<Bell />} />
                <AppSetting />
            </div>
        </header>
    );
}
