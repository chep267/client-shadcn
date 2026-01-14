/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';

/** hooks */
import { useSignout } from '@module-auth/hooks/useSignout';

/** components */
import { Spinner } from '@module-base/components/spinner';
import { DropdownMenuItem } from '@module-base/components/dropdown-menu';

export default function ItemSignout() {
    const hookSignout = useSignout();

    const onSignout = () => (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        hookSignout.mutate(undefined, { onSettled: () => {} });
    };

    return (
        <DropdownMenuItem
            className={clsx('hover:*:!text-danger cursor-pointer', { '*:!text-danger': hookSignout.isPending })}
            onClick={onSignout}
        >
            {hookSignout.isPending ? <Spinner /> : <LogOutIcon />}
            <span>Sign out</span>
        </DropdownMenuItem>
    );
}
