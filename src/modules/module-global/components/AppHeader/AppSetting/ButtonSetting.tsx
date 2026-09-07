/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { FormattedMessage } from 'react-intl';
import { MenuIcon } from 'lucide-react';

/** constants */
import { GlobalLanguage } from '@module-global/constants/language';

/** components */
import { Button } from '@module-base/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@module-base/components/tooltip';
import { DropdownMenuTrigger } from '@module-base/components/dropdown-menu';

export function ButtonSetting() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'size-10 min-w-10 border-0',
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
                <FormattedMessage id={GlobalLanguage.component.label.setting} defaultMessage="Setting" />
            </TooltipContent>
        </Tooltip>
    );
}
