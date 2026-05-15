/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/language';

/** stores */
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** components */
import { SelectBase } from '@module-base/components/select-base';

interface SelectDisplayProps {
    className?: string;
}

export const SelectDisplay = React.memo(function SelectDisplay(props: SelectDisplayProps) {
    const { className } = props;

    const display = useCalendarStore(({ data }) => data.display);
    const calendarAction = useCalendarStore(({ action }) => action);

    const items = React.useMemo(() => {
        return [
            {
                label: (
                    <FormattedMessage id={CalendarLanguage.component.label.display.default} defaultMessage="Default" />
                ),
                value: 'sunday',
            },
            {
                label: (
                    <FormattedMessage id={CalendarLanguage.component.label.display.monday} defaultMessage="Monday" />
                ),
                value: 'monday',
            },
            {
                label: (
                    <FormattedMessage id={CalendarLanguage.component.label.display.weekend} defaultMessage="Weekend" />
                ),
                value: 'weekend',
            },
        ];
    }, []);

    return <SelectBase className={className} value={display} items={items} onChange={calendarAction.setDisplay} />;
});
