/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import DashBoardHeader from '@module-dashboard/components/DashBoardHeader';
import DashboardContent from '@module-dashboard/components/DashboardContent';

export default function DashboardScreen() {
    return (
        <div
            className={cn(
                'flex flex-1 flex-col',
                'w-full max-w-dvw space-y-6 py-4',
                'max-h-[calc(100dvh-var(--app-size-height-header)-var(--app-size-height-sidebar-mini))] px-2',
                'tablet:px-4 tablet:max-h-[calc(100dvh-var(--app-size-height-header))]'
            )}
        >
            <DashBoardHeader />
            <DashboardContent />
        </div>
    );
}
