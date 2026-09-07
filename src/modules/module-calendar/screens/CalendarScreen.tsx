/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { CalendarTable } from '@module-calendar/components/CalendarTable';
import { CalendarModal } from '@module-calendar/components/CalendarModal';
import { CalendarSelect } from '@module-calendar/components/CalendarSelect';

export default function CalendarScreen() {
    return (
        <div
            className={cn(
                '[--app-size-calendar-screen-py:--spacing(4)]',
                '[--app-size-calendar-select-height:60px]',
                'flex flex-1 flex-col',
                'px-2 py-(--app-size-calendar-screen-py)',
                'tablet:px-5'
            )}
        >
            <CalendarSelect />
            <CalendarTable />
            <CalendarModal />
        </div>
    );
}
