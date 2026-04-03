/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { LogOutIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSignout } from '@module-auth/hooks/useSignout';

/** components */
import { Spinner } from '@module-base/components/spinner';
import { DropdownMenuItem } from '@module-base/components/dropdown-menu';

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
            <span>Sign out</span>
        </DropdownMenuItem>
    );
}
