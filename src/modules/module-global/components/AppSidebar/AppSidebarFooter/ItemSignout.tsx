/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { LogOutIcon } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { GlobalLanguage } from '@module-global/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSignout } from '@module-auth/hooks/useSignout';

/** components */
import { Spinner } from '@module-base/components/spinner';
import { DropdownMenuItem } from '@module-base/components/dropdown-menu';
import { Typography } from '@module-base/components/typography';

export function ItemSignout() {
    const hookSignout = useSignout();

    const onSignout = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        hookSignout.mutate();
    };

    return (
        <DropdownMenuItem
            className={cn('hover:*:!text-danger cursor-pointer', { '*:!text-danger': hookSignout.isPending })}
            onClick={onSignout}
        >
            {hookSignout.isPending ? <Spinner /> : <LogOutIcon />}
            <Typography className="text-sm">
                <FormattedMessage id={GlobalLanguage.component.label.signout} defaultMessage="Account" />
            </Typography>
        </DropdownMenuItem>
    );
}
