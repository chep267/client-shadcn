/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';
import dayjs from 'dayjs';

/** constants */
import { CalendarDisplay } from '@modules/calendar/constants';

export const useCalendarStore = create<App.Module.Calendar.Store.CalendarStore>((set, getState) => ({
    data: {
        display: CalendarDisplay.sunday,
        today: dayjs(),
        day: dayjs(),
        isOnlyMonth: false,
        openCalendarModal: false,
    },
    action: {
        isToday: (day) => {
            const { today } = getState().data;
            return day.isSame(today);
        },
        isWeekend: (day) => {
            return day.day() === 6 || day.day() === 0;
        },
        isInMonth: (day) => {
            const { day: selectedDay } = getState().data;
            return day.isSame(selectedDay, 'month');
        },
        isSelectedDay: (day) => {
            const { day: selectedDay } = getState().data;
            return day.isSame(selectedDay);
        },
        setDisplay: (display = CalendarDisplay.sunday) => {
            set(
                produce<App.Module.Calendar.Store.CalendarStore>(({ data }) => {
                    data.display = display;
                })
            );
        },
        setDay: (day) => {
            set(
                produce<App.Module.Calendar.Store.CalendarStore>(({ data }) => {
                    data.day = day;
                })
            );
        },
        setIsOnlyMonth: (isOnlyMonth = false) => {
            set(
                produce<App.Module.Calendar.Store.CalendarStore>(({ data }) => {
                    data.isOnlyMonth = isOnlyMonth;
                })
            );
        },
        setOpenCalendarModal: (openCalendarModal = false) => {
            set(
                produce<App.Module.Calendar.Store.CalendarStore>(({ data }) => {
                    data.openCalendarModal = openCalendarModal;
                })
            );
        },
    },
}));
