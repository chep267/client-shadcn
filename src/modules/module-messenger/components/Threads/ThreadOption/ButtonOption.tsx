/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import { EllipsisIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@module-base/components/tooltip';
import { DropdownMenuTrigger } from '@module-base/components/dropdown-menu';

export function ButtonOption() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'h-8 w-8 border-0 p-0',
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
            <TooltipContent>
                <FormattedMessage id="1" defaultMessage="Options" />
            </TooltipContent>
        </Tooltip>
    );
}
