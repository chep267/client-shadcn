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
import { SelectBase } from '@modules/base/components/select-base';

interface SelectDisplayProps {
    className?: string;
}

export const SelectDisplay = React.memo(function SelectDisplay(props: SelectDisplayProps) {
    const { className } = props;

    const display = useCalendarStore(({ data }) => data.display);
    const setDisplay = useCalendarStore(({ action }) => action.setDisplay);

    const items = React.useMemo<
        {
            label: React.ReactNode;
            value: App.Module.Calendar.Data.CalendarDisplay;
        }[]
    >(() => {
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

    return <SelectBase className={className} value={display} items={items} onChange={setDisplay} />;
});
