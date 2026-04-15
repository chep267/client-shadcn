/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';

/** utils */
import { genMatrixCalendarDayJS, reverseMatrix } from '@module-calendar/utils/calendar';

/** stores */
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** components */
import { TableBase } from '@module-base/components/table-base';
import { CalendarLabel } from '@module-calendar/components/CalendarTable/CalendarLabel';
import { CalendarItem } from '@module-calendar/components/CalendarTable/CalendarItem';
import { cn } from '@module-base/utils/shadcn.ts';

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
                    label: <CalendarLabel day={id} />,
                    render: ({ item }) => <CalendarItem day={item[id]} />,
                }) as App.ModuleBase.Component.TypeTableColumn<App.ModuleCalendar.Data.TypeCalendarData[]>
        );
    }, [display]);

    const items = React.useMemo(() => {
        const matrixCalendar = genMatrixCalendarDayJS(day, display);
        const output = reverseMatrix(matrixCalendar);
        return output.map((item) => item);
    }, [day.month(), day.year(), display]);

    return (
        <TableBase
            className={cn('scrollbar-thin scrollbar-custom', 'h-auto', '[&_tr]:hover:bg-inherit')}
            items={items}
            columns={columns}
        />
    );
}
