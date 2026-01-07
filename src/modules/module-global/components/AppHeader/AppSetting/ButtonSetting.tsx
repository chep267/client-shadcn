/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { MenuIcon } from 'lucide-react';

/** constants */
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import { Button } from '@module-base/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@module-base/components/tooltip';
import { DropdownMenuTrigger } from '@module-base/components/dropdown-menu';

export default function ButtonSetting() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={clsx(
                            'h-10 w-10 min-w-10 border-0 p-0',
                            'cursor-pointer rounded-full bg-inherit text-inherit shadow-none',
                            'focus-visible:ring-0',
                            'hover:border hover:text-inherit'
                        )}
                        aria-label="menu-setting"
                    >
                        <MenuIcon />
                    </Button>
                </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
                <FormattedMessage id={GlobalLanguage.component.label.setting} />
            </TooltipContent>
        </Tooltip>
    );
}
