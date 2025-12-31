/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import dayjs from 'dayjs';

/** components */
import { Typography } from '@module-base/components/typography';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

function Timer() {
    const locale = useSettingStore((store) => store.data.locale);
    return dayjs().locale(locale).format('dddd, DD/MM/YYYY');
}

export default function AppTimer() {
    return (
        <div className={clsx('items-center gap-2', 'hidden', 'md:flex')}>
            <div className={clsx('bg-main h-2 w-2 rounded-full', 'dark:bg-foreground')} />
            <Typography className="text-sm capitalize">
                <Timer />
            </Typography>
            <div className={clsx('bg-main h-2 w-2 rounded-full', 'dark:bg-foreground')} />
        </div>
    );
}
