/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { CalendarTable } from '@module-calendar/components/CalendarTable';
import { CalendarModal } from '@module-calendar/components/CalendarModal';
import { CalendarSelect } from '@module-calendar/components/CalendarSelect';

export default function CalendarScreen() {
    return (
        <div
            className={cn(
                'flex flex-1 flex-col',
                'w-full max-w-dvw space-y-6 py-4',
                'max-h-[calc(100dvh-var(--app-size-height-header)-var(--app-size-height-sidebar-mini))] px-2',
                'tablet:px-4 tablet:max-h-[calc(100dvh-var(--app-size-height-header))]'
            )}
        >
            <CalendarSelect />
            <CalendarTable />
            <CalendarModal />
        </div>
    );
}
