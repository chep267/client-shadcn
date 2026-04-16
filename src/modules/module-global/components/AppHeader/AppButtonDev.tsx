/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import { Button } from '@module-base/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@module-base/components/tooltip';

export function AppButtonDev(props: any) {
    const { icon } = props;

    const locale = useSettingStore((store) => store.data.locale);

    const onDev = () => {
        const formatString =
            locale === 'vi' ? 'dddd, [ngày] DD [tháng] M, YYYY [at] h:mm A' : 'dddd, MMMM DD, YYYY [at] h:mm A';

        toast.warning(
            <FormattedMessage
                id={BaseLanguage.component.label.develop}
                defaultMessage={BaseLanguage.component.label.develop}
            />,
            {
                description: dayjs().format(formatString),
            }
        );
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'h-10 w-10 min-w-10 border-0 p-0',
                        'cursor-pointer rounded-full text-inherit shadow-none',
                        'hover:border hover:text-inherit'
                    )}
                    aria-label="dev"
                    onClick={onDev}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <FormattedMessage
                    id={BaseLanguage.component.label.develop}
                    defaultMessage={BaseLanguage.component.label.develop}
                />
            </TooltipContent>
        </Tooltip>
    );
}
