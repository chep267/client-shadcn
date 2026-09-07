/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import dayjs from 'dayjs';
import { Typography } from '@module-base/components/typography';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

export function CalendarLabel(props: App.ModuleCalendar.Component.CalendarLabelProps) {
    const { day } = props;

    const locale = useSettingStore(({ data }) => data.locale);

    return (
        <Typography className={cn('m-auto w-fit', { 'text-danger': day === 0 || day === 6 })} component="h6">
            {dayjs().day(day).locale(locale).format('ddd')}
        </Typography>
    );
}
