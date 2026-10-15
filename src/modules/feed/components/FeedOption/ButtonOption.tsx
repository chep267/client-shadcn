/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { FormattedMessage } from 'react-intl';
import { EllipsisIcon } from 'lucide-react';

/** constants */
import { FeedLanguage } from '@modules/feed/constants/language';

/** components */
import { Button } from '@modules/base/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@modules/base/components/tooltip';
import { DropdownMenuTrigger } from '@modules/base/components/dropdown-menu';

export function ButtonOption() {
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
                        <EllipsisIcon />
                    </Button>
                </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent align="end" side="bottom">
                <FormattedMessage id={FeedLanguage.component.button.option} defaultMessage="Option" />
            </TooltipContent>
        </Tooltip>
    );
}
