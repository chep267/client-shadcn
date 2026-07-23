/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Dayjs } from 'dayjs';
import type { CalendarDisplay } from '@module-calendar/types/data.d';

/** calendar store */
interface CalendarStoreData {
    today: Dayjs;
    display: CalendarDisplay;
    day: Dayjs;
    isOnlyMonth: boolean;
    openCalendarModal: boolean;
}
interface CalendarStoreAction {
    setDisplay: (display?: CalendarDisplay) => void;
    setDay: (day: Dayjs) => void;
    setIsOnlyMonth: (isOnlyMonth?: boolean) => void;
    setOpenCalendarModal: (open?: boolean) => void;
    isWeekend: (day: Dayjs) => boolean;
    isToday: (day: Dayjs) => boolean;
    isInMonth: (day: Dayjs) => boolean;
    isSelectedDay: (day: Dayjs) => boolean;
}
export interface CalendarStore {
    data: CalendarStoreData;
    action: CalendarStoreAction;
}
