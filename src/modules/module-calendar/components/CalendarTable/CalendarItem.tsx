/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** components */
import { Typography } from '@module-base/components/typography';

export function CalendarItem(props: App.ModuleCalendar.Component.CalendarItemProps) {
    const { day } = props;

    const isOnlyMonth = useCalendarStore(({ data }) => data.isOnlyMonth);
    const selectedDay = useCalendarStore(({ data }) => data.day);
    const calendarAction = useCalendarStore(({ action }) => action);

    const onSelect = () => {
        calendarAction.setDay(day);
        calendarAction.setOpenCalendarModal(true);
    };

    const isWeekend = calendarAction.isWeekend(day);
    const isInMonth = calendarAction.isInMonth(day);
    const isToday = calendarAction.isToday(day);
    const isSelectedDay = selectedDay.isSame(day);

    return (
        <div
            className={cn(
                'group flex items-center justify-center',
                'm-auto h-10 w-10',
                'cursor-pointer rounded-full',
                'hover:bg-muted hover:border',
                {
                    ['border']: isSelectedDay,
                    ['bg-main/10 text-main [&_*]:font-bold']: isToday,
                    ['text-danger hover:text-danger']: isWeekend,
                    ['bg-danger/10 text-danger']: isToday && isWeekend,
                    ['text-secondary hover:text-primary']: !isInMonth,
                    ['invisible']: isOnlyMonth && !isInMonth,
                }
            )}
            onClick={onSelect}
        >
            <Typography className={cn('font-normal group-hover:font-bold')}>{day.date()}</Typography>
        </div>
    );
}
