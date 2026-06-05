/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetUser } from '@module-user/hooks/useGetUser';

/** components */
import { Skeleton } from '@module-base/components/skeleton';
import { Typography } from '@module-base/components/typography';
import { UserNameNoGet } from '@module-user/components/UserName/UserNameNoGet';

interface UserNameGetProps extends React.ComponentProps<typeof Typography> {
    uid?: string;
}

export function UserNameGet(props: UserNameGetProps) {
    const { uid, className, ...otherProps } = props;
    const { isFetching, data } = useGetUser(uid);
    const { data: user } = data ?? {};

    if (isFetching) {
        return (
            <Typography className={cn('relative size-full min-h-5 max-w-20 min-w-10', className)} {...otherProps}>
                <Skeleton className="absolute inset-0 h-full w-full" />
            </Typography>
        );
    }

    return <UserNameNoGet {...otherProps} name={user?.name} />;
}
