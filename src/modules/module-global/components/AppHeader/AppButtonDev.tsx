/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** components */
import { Button } from '@module-base/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@module-base/components/tooltip';

export default function AppButtonDev(props: any) {
    const { icon } = props;

    const onDev = () => {
        toast.warning('In developing!', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
        });
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    className={clsx(
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
                <FormattedMessage id={BaseLanguage.component.label.develop} />
            </TooltipContent>
        </Tooltip>
    );
}
