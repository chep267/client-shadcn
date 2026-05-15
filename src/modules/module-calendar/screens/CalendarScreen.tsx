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
        <div className={cn('flex flex-1 flex-col', 'px-2 py-4', 'tablet:px-5')}>
            <CalendarSelect />
            <CalendarTable />
            <CalendarModal />
        </div>
    );
}
