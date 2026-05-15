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
import { UserLanguage } from '@module-user/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSignout } from '@module-auth/hooks/useSignout';

/** components */
import { Spinner } from '@module-base/components/spinner';
import { Button } from '@module-base/components/button';
import { Typography } from '@module-base/components/typography';

export function ButtonSignout() {
    const hookSignout = useSignout();

    const onSignout = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        hookSignout.mutate();
    };

    return (
        <Button
            className={cn('hover:*:!text-danger cursor-pointer', { '*:!text-danger': hookSignout.isPending })}
            variant="outline"
            onClick={onSignout}
        >
            {hookSignout.isPending ? <Spinner /> : <LogOutIcon />}
            <Typography className="text-sm">
                <FormattedMessage id={UserLanguage.component.label.signout} defaultMessage="Account" />
            </Typography>
        </Button>
    );
}
