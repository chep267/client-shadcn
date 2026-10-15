/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { CalendarLanguage } from '@modules/calendar/constants/language';

/** stores */
import { useCalendarStore } from '@modules/calendar/stores/useCalendarStore';

/** components */
import { Button } from '@modules/base/components/button';

interface ButtonTodayProps {
    className?: string;
}

export const ButtonToday = React.memo(function ButtonToday(props: ButtonTodayProps) {
    const { className } = props;

    const today = useCalendarStore(({ data }) => data.today);
    const selectedDay = useCalendarStore(({ data }) => data.day);
    const calendarAction = useCalendarStore(({ action }) => action);

    return (
        <Button
            variant="outline"
            className={className}
            disabled={calendarAction.isToday(selectedDay)}
            onClick={() => calendarAction.setDay(today)}
        >
            <FormattedMessage id={CalendarLanguage.component.label.today} defaultMessage="Today" />
        </Button>
    );
});
