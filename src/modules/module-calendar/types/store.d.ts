/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Dayjs } from 'dayjs';

export type TypeCalendarDisplay = 'sunday' | 'monday' | 'weekend';

/** Auth store */
type TypeCalendarData = {
    today: Dayjs;
    display: TypeCalendarDisplay;
    day: Dayjs;
    isOnlyMonth: boolean;
    openCalendarModal: boolean;
};
type TypeCalendarAction = {
    setDisplay: (display?: TypeCalendarDisplay) => void;
    setDay: (day: Dayjs) => void;
    setIsOnlyMonth: (isOnlyMonth?: boolean) => void;
    setOpenCalendarModal: (open?: boolean) => void;
    isWeekend: (day: Dayjs) => boolean;
    isToday: (day: Dayjs) => boolean;
    isInMonth: (day: Dayjs) => boolean;
    isSelectedDay: (day: Dayjs) => boolean;
};
export type TypeCalendarStore = {
    data: TypeCalendarData;
    action: TypeCalendarAction;
};
