/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import dayjs from 'dayjs';

/** components */
import { Typography } from '@module-base/components/typography';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

function Timer() {
    const locale = useSettingStore((store) => store.data.locale);
    return dayjs().locale(locale).format('dddd, DD/MM/YYYY');
}

export function AppTimer() {
    return (
        <div className={cn('items-center gap-2', 'hidden', 'tablet:flex')}>
            <div className={cn('bg-main h-2 w-2 rounded-full', 'dark:bg-foreground')} />
            <Typography className="text-sm capitalize">
                <Timer />
            </Typography>
            <div className={cn('bg-main h-2 w-2 rounded-full', 'dark:bg-foreground')} />
        </div>
    );
}
