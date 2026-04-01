/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** services */
import { generateTasks } from '@module-dashboard/services/project';

/** components */
import DashboardContent from '@module-dashboard/components/DashboardContent';
import DashBoardHeader from '@module-dashboard/components/DashBoardHeader';

export default function DashboardScreen() {
    const [data] = React.useState(() => generateTasks(999));

    return (
        <div
            className={cn(
                'flex shrink grow flex-col',
                'w-full max-w-dvw space-y-6 py-4',
                'max-h-[calc(100dvh-var(--app-size-height-header)-var(--app-size-height-sidebar-mini))] px-2',
                'tablet:px-4 tablet:max-h-[calc(100dvh-var(--app-size-height-header))]'
            )}
        >
            <DashBoardHeader data={data} />
            <DashboardContent data={data} />
        </div>
    );
}
