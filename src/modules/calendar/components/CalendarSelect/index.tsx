/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { SelectDisplay } from '@modules/calendar/components/CalendarSelect/SelectDisplay';
import { SelectOnlyMonth } from '@modules/calendar/components/CalendarSelect/SelectOnlyMonth';
import { ButtonToday } from '@modules/calendar/components/CalendarSelect/ButtonToday';
import { TimePicker } from '@modules/calendar/components/CalendarSelect/TimePicker';

export function CalendarSelect() {
    return (
        <div
            className={cn(
                'flex h-(--app-size-calendar-select-height) w-full items-start justify-between gap-2',
                'flex-col-reverse py-2',
                'tablet:flex-row md:py-3'
            )}
        >
            <div className="tablet:w-auto flex w-full items-center gap-2">
                <ButtonToday className="tablet:w-max w-1/3 cursor-pointer truncate capitalize" />
                <SelectDisplay className="tablet:w-max w-1/3" />
                <SelectOnlyMonth className="tablet:w-max w-1/3" />
            </div>

            <TimePicker />
        </div>
    );
}
