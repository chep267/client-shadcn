/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ChevronLeftIcon, ChevronsLeftIcon, ChevronRightIcon, ChevronsRightIcon } from 'lucide-react';

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** hooks */
import { useIsMobile } from '@module-base/hooks/useMobile';

/** components */
import { Button } from '@module-base/components/button';
import { Typography } from '@module-base/components/typography';

export function TimePicker() {
    const isMobile = useIsMobile();

    const locale = useSettingStore(({ data }) => data.locale);
    const selectedDay = useCalendarStore(({ data }) => data.day);
    const calendarAction = useCalendarStore(({ action }) => action);

    const timeMonthYear = React.useMemo(() => {
        return {
            month: selectedDay.locale(locale).format(isMobile ? 'MM' : 'MMMM'),
            year: selectedDay.locale(locale).format('YYYY'),
        };
    }, [selectedDay.month(), selectedDay.year(), isMobile, locale]);

    const onChangeTime = (mode: 'prev' | 'next', type: 'month' | 'year') => {
        calendarAction.setDay(selectedDay.add(mode === 'prev' ? -1 : 1, type));
    };

    return (
        <div
            className={cn('flex flex-row items-start justify-between gap-1', 'w-full', 'sm:gap-2', 'md:w-fit md:gap-5')}
        >
            <div className={cn('flex flex-row items-center gap-1', 'sm:gap-2')}>
                <Button
                    className="min-w-0 cursor-pointer"
                    variant="outline"
                    size="sm"
                    aria-label="prev-year"
                    onClick={() => onChangeTime('prev', 'year')}
                >
                    <ChevronsLeftIcon />
                </Button>
                <Button
                    className="min-w-0 cursor-pointer"
                    variant="outline"
                    size="sm"
                    aria-label="prev-month"
                    onClick={() => onChangeTime('prev', 'month')}
                >
                    <ChevronLeftIcon />
                </Button>
            </div>

            <div
                className={cn(
                    'relative flex w-full cursor-pointer flex-row items-start justify-center rounded-md text-center'
                )}
            >
                <Typography component="h5" className="text-main line-clamp-2 capitalize">
                    <FormattedMessage id={CalendarLanguage.component.label.calendarInfo.title} values={timeMonthYear} />
                </Typography>
            </div>

            <div className={cn('flex flex-row items-center gap-1', 'sm:gap-2')}>
                <Button
                    className="min-w-0 cursor-pointer"
                    variant="outline"
                    size="sm"
                    aria-label="next-month"
                    onClick={() => onChangeTime('next', 'month')}
                >
                    <ChevronRightIcon />
                </Button>
                <Button
                    className="min-w-0 cursor-pointer"
                    variant="outline"
                    size="sm"
                    aria-label="next-year"
                    onClick={() => onChangeTime('next', 'year')}
                >
                    <ChevronsRightIcon />
                </Button>
            </div>
        </div>
    );
}
