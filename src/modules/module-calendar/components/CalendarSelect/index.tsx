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
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useIsMobile } from '@module-base/hooks/useMobile';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useCalendarStore } from '@module-calendar/stores/useCalendarStore';

/** components */
import { Button } from '@/modules/module-base/components/button';
import { Typography } from '@module-base/components/typography';
import { SelectBase } from '@module-base/components/select-base';

export function CalendarSelect() {
    const isMobile = useIsMobile();

    const locale = useSettingStore(({ data }) => data.locale);
    const today = useCalendarStore(({ data }) => data.today);
    const selectedDay = useCalendarStore(({ data }) => data.day);
    const display = useCalendarStore(({ data }) => data.display);
    const isOnlyMonth = useCalendarStore(({ data }) => data.isOnlyMonth);
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
            className={cn(
                'flex h-fit w-full items-start justify-between gap-2',
                'flex-col-reverse p-2',
                'tablet:flex-row md:p-3'
            )}
        >
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="w-max cursor-pointer truncate capitalize"
                    disabled={calendarAction.isToday(selectedDay)}
                    onClick={() => calendarAction.setDay(today)}
                >
                    <FormattedMessage id={CalendarLanguage.component.label.today} />
                </Button>

                <SelectBase
                    className="tablet:max-w-40 tablet:min-w-25 w-max"
                    placeholder="Choose display"
                    value={display}
                    items={[
                        { label: 'Default', value: 'sunday' },
                        { label: 'Monday', value: 'monday' },
                        { label: 'Weekend', value: 'weekend' },
                    ]}
                    onChange={(value) => calendarAction.setDisplay(value as typeof display)}
                />

                <SelectBase
                    className="tablet:max-w-40 tablet:min-w-25 w-max"
                    placeholder="Choose display"
                    value={`${isOnlyMonth}`}
                    items={[
                        { label: 'In month', value: 'true' },
                        { label: 'All month', value: 'false' },
                    ]}
                    onChange={(value) => calendarAction.setIsOnlyMonth(value === 'true')}
                />
            </div>

            <div
                className={cn(
                    'flex flex-row items-start justify-between gap-1',
                    'w-full',
                    'sm:gap-2',
                    'md:w-fit md:gap-5'
                )}
            >
                <div className={cn('flex flex-row items-center gap-1', 'sm:gap-2')}>
                    <Button
                        className="min-w-0 cursor-pointer"
                        variant="outline"
                        size="sm"
                        onClick={() => onChangeTime('prev', 'year')}
                    >
                        <ChevronsLeftIcon />
                    </Button>
                    <Button
                        className="min-w-0 cursor-pointer"
                        variant="outline"
                        size="sm"
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
                        <FormattedMessage
                            id={CalendarLanguage.component.label.calendarInfo.title}
                            values={timeMonthYear}
                        />
                    </Typography>
                </div>

                <div className={cn('flex flex-row items-center gap-1', 'sm:gap-2')}>
                    <Button
                        className="min-w-0 cursor-pointer"
                        variant="outline"
                        size="sm"
                        onClick={() => onChangeTime('next', 'month')}
                    >
                        <ChevronRightIcon />
                    </Button>
                    <Button
                        className="min-w-0 cursor-pointer"
                        variant="outline"
                        size="sm"
                        onClick={() => onChangeTime('next', 'year')}
                    >
                        <ChevronsRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}
