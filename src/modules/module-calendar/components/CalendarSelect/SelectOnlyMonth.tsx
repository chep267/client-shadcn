/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** stores */
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** components */
import { SelectBase } from '@module-base/components/select-base';

interface SelectOnlyMonthProps {
    className?: string;
}

export const SelectOnlyMonth = React.memo(function SelectOnlyMonth(props: SelectOnlyMonthProps) {
    const { className } = props;

    const isOnlyMonth = useCalendarStore(({ data }) => data.isOnlyMonth);
    const calendarAction = useCalendarStore(({ action }) => action);

    const items = React.useMemo(() => {
        return [
            {
                label: (
                    <FormattedMessage
                        id={CalendarLanguage.component.label.display.onlyMonth}
                        defaultMessage="In month"
                    />
                ),
                value: 'true',
            },
            {
                label: (
                    <FormattedMessage
                        id={CalendarLanguage.component.label.display.bothMonth}
                        defaultMessage="All month"
                    />
                ),
                value: 'false',
            },
        ];
    }, []);

    return (
        <SelectBase
            className={className}
            value={`${isOnlyMonth}`}
            items={items}
            onChange={(value) => calendarAction.setIsOnlyMonth(value === 'true')}
        />
    );
});
