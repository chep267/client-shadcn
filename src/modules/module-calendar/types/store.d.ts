/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Dayjs } from 'dayjs';

export type CalendarDisplay = 'sunday' | 'monday' | 'weekend';

/** calendar store */
type CalendarStoreData = {
    today: Dayjs;
    display: CalendarDisplay;
    day: Dayjs;
    isOnlyMonth: boolean;
    openCalendarModal: boolean;
};
type CalendarStoreAction = {
    setDisplay: (display?: CalendarDisplay) => void;
    setDay: (day: Dayjs) => void;
    setIsOnlyMonth: (isOnlyMonth?: boolean) => void;
    setOpenCalendarModal: (open?: boolean) => void;
    isWeekend: (day: Dayjs) => boolean;
    isToday: (day: Dayjs) => boolean;
    isInMonth: (day: Dayjs) => boolean;
    isSelectedDay: (day: Dayjs) => boolean;
};
export type CalendarStore = {
    data: CalendarStoreData;
    action: CalendarStoreAction;
};
