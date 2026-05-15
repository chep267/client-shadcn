/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { SelectDisplay } from '@module-calendar/components/CalendarSelect/SelectDisplay';
import { SelectOnlyMonth } from '@module-calendar/components/CalendarSelect/SelectOnlyMonth';
import { ButtonToday } from '@module-calendar/components/CalendarSelect/ButtonToday';
import { TimePicker } from '@module-calendar/components/CalendarSelect/TimePicker';

export function CalendarSelect() {
    return (
        <div
            className={cn(
                'flex h-fit w-full items-start justify-between gap-2',
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
