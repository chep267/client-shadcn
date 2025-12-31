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
import { MenubarTrigger } from '@module-base/components/menubar';

export default function ButtonSetting() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <MenubarTrigger asChild>
                    <Button
                        variant="outline"
                        className={clsx(
                            'h-10 w-10 min-w-10 border-0 p-0',
                            'cursor-pointer rounded-full bg-inherit text-inherit shadow-none',
                            'hover:border hover:bg-inherit'
                        )}
                        aria-label="menu-setting"
                    >
                        <MenuIcon />
                    </Button>
                </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent>
                <FormattedMessage id={GlobalLanguage.component.label.setting} />
            </TooltipContent>
        </Tooltip>
    );
}
