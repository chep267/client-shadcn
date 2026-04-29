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
            <div className="flex items-center gap-2">
                <ButtonToday className="w-max cursor-pointer truncate capitalize" />
                <SelectDisplay className="tablet:max-w-40 tablet:min-w-25 w-max" />
                <SelectOnlyMonth className="tablet:max-w-40 tablet:min-w-25 w-max" />
            </div>

            <TimePicker />
        </div>
    );
}
