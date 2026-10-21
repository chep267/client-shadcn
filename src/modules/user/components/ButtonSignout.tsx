/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { LogOutIcon } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { UserLanguage } from '@modules/user/constants';

/** hooks */
import { useSignout } from '@modules/auth/hooks/useSignout';

/** components */
import { Spinner } from '@modules/base/components/spinner';
import { Button } from '@modules/base/components/button';
import { Typography } from '@modules/base/components/typography';

export function ButtonSignout() {
    const hookSignout = useSignout();

    const onSignout = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        hookSignout.mutate();
    };

    return (
        <Button
            className={cn('hover:*:text-danger! cursor-pointer', { '*:text-danger!': hookSignout.isPending })}
            variant="outline"
            onClick={onSignout}
        >
            {hookSignout.isPending ? <Spinner /> : <LogOutIcon />}
            <Typography className="text-sm">
                <FormattedMessage id={UserLanguage.component.button.signout} defaultMessage="Signout" />
            </Typography>
        </Button>
    );
}
