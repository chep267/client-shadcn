/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import VietnameseDate from '@module-calendar/utils/lunar';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** components */
import { Typography } from '@module-base/components/typography';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@module-base/components/dialog';

export function CalendarModal() {
    const locale = useSettingStore((store) => store.data.locale);
    const selectedDay = useCalendarStore(({ data }) => data.day);
    const openCalendarModal = useCalendarStore(({ data }) => data.openCalendarModal);
    const calendarAction = useCalendarStore(({ action }) => action);

    const isWeekend = calendarAction.isWeekend(selectedDay);
    const lunarDay = new VietnameseDate(
        new Date(`${selectedDay.year()}-${selectedDay.month() + 1}-${selectedDay.date()}`)
    );

    return (
        <Dialog open={openCalendarModal} onOpenChange={() => calendarAction.setOpenCalendarModal(false)}>
            <DialogContent
                className={cn('scrollbar-thin scrollbar-custom', 'h-auto max-h-[80dvh] overflow-auto p-0')}
                showCloseButton={false}
            >
                <DialogHeader className="pt-5">
                    <DialogTitle
                        className={cn('line-clamp-2 text-center text-2xl capitalize', { ['text-danger']: isWeekend })}
                    >
                        <FormattedMessage
                            id={CalendarLanguage.component.label.calendarInfo.title}
                            values={{
                                month: selectedDay.locale(locale).format('MMMM'),
                                year: selectedDay.locale(locale).format('YYYY'),
                            }}
                            defaultMessage="{month} {year}"
                        />
                    </DialogTitle>
                </DialogHeader>

                {/*     solar    */}
                <div className="flex h-84 flex-col items-center justify-between py-4">
                    <Typography
                        component="h1"
                        className={cn('text-[10rem]', {
                            ['text-danger']: isWeekend,
                        })}
                    >
                        {selectedDay.date()}
                    </Typography>
                    <Typography
                        component="h3"
                        className={cn('capitalize', {
                            ['text-danger']: isWeekend,
                        })}
                    >
                        {selectedDay.locale(locale).format('dddd')}
                    </Typography>
                </div>

                {/*     lunar    */}
                <div className="flex h-36 border-t">
                    <div className={cn('flex flex-1 flex-col items-center justify-between', 'py-2')}>
                        <Typography component="h5">
                            <FormattedMessage id={CalendarLanguage.component.label.day} />
                        </Typography>
                        <Typography component="h2">{lunarDay.day}</Typography>
                        <Typography component="h5">
                            {`${lunarDay.celestialStemOfDay} ${lunarDay.terrestrialBranchOfDay}`}
                        </Typography>
                    </div>
                    <div className={cn('flex flex-1 flex-col items-center justify-between', 'border-r border-l py-2')}>
                        <Typography component="h5">
                            <FormattedMessage id={CalendarLanguage.component.label.month} />
                        </Typography>
                        <Typography component="h2">{lunarDay.month}</Typography>
                        <Typography component="h5">
                            {`${lunarDay.celestialStemOfMonth} ${lunarDay.terrestrialBranchOfMonth}`}
                        </Typography>
                    </div>
                    <div className={cn('flex flex-1 flex-col items-center justify-between', 'py-2')}>
                        <Typography component="h5">
                            <FormattedMessage id={CalendarLanguage.component.label.year} />
                        </Typography>
                        <Typography component="h2">{lunarDay.year}</Typography>
                        <Typography component="h5">
                            {`${lunarDay.celestialStemOfYear} ${lunarDay.terrestrialBranchOfYear}`}
                        </Typography>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
