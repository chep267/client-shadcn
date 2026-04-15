/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Dayjs } from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import type { TypeCalendarDisplay } from '@modules/module-calendar/types/data';

export type CalendarItemProps = {
    day: Dayjs;
};

export type CalendarLabelProps = {
    day: number;
};

export type CalendarContextProps = {
    data: {
        today: Dayjs;
        display: TypeCalendarDisplay;
        day: Dayjs;
        isOnlyMonth: boolean;
        openCalendarModal: boolean;
    };
    method: {
        setDisplay: Dispatch<SetStateAction<CalendarContextProps['data']['display']>>;
        setDay: Dispatch<SetStateAction<Dayjs>>;
        setIsOnlyMonth: Dispatch<SetStateAction<boolean>>;
        setOpenCalendarModal: Dispatch<SetStateAction<boolean>>;
        isWeekend: (day: Dayjs | number) => boolean;
        isToday: (day: Dayjs) => boolean;
        isInMonth: (day: Dayjs) => boolean;
        isSelectedDay: (day: Dayjs) => boolean;
    };
};

export type CalendarTableDataType = Record<number, Dayjs>;
