/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';

/** constants */
import { CalendarDisplay } from '@modules/calendar/constants/config';

/** utils */
import { genMatrixCalendarDayJS, reverseMatrix } from '@modules/calendar/utils/calendar';

/** stores */
import { useCalendarStore } from '@modules/calendar/stores/useCalendarStore';

/** components */
import { TableBase } from '@modules/base/components/table-base';
import { CalendarLabel } from '@modules/calendar/components/CalendarTable/CalendarLabel';
import { CalendarItem } from '@modules/calendar/components/CalendarTable/CalendarItem';

export function CalendarTable() {
    const display = useCalendarStore(({ data }) => data.display);
    const day = useCalendarStore(({ data }) => data.day);

    const columns = React.useMemo(() => {
        let output: number[];
        switch (display) {
            case CalendarDisplay.weekend:
                output = [6, 0, 1, 2, 3, 4, 5];
                break;
            case CalendarDisplay.monday:
                output = [1, 2, 3, 4, 5, 6, 0];
                break;
            case CalendarDisplay.sunday:
            default:
                output = [0, 1, 2, 3, 4, 5, 6];
                break;
        }
        return output.map(
            (id) =>
                ({
                    dataKey: `${id}`,
                    label: () => <CalendarLabel day={id} />,
                    render: ({ item }) => <CalendarItem day={item[id]} />,
                }) as App.Module.Base.Component.Column<App.Module.Calendar.Data.CalendarData[]>
        );
    }, [display]);

    const items = React.useMemo(() => {
        const matrixCalendar = genMatrixCalendarDayJS(day, display);
        const output = reverseMatrix(matrixCalendar);
        return output.map((item) => item);
    }, [day.month(), day.year(), display]);

    return (
        <TableBase
            className={cn(
                'max-h-[calc(var(--app-size-height-screen)-var(--app-size-calendar-screen-py)*2-var(--app-size-calendar-select-height))]',
                '[&_tr]:hover:bg-inherit'
            )}
            items={items}
            columns={columns}
        />
    );
}
