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
import { Avatar } from '@module-base/components/avatar';
import { UserAvatarNoGet } from '@module-user/components/UserAvatar/UserAvatarNoGet';

interface UserAvatarGetProps extends React.ComponentProps<typeof Avatar> {
    uid?: string;
}

export function UserAvatarGet(props: UserAvatarGetProps) {
    const { uid, className, size, ...otherProps } = props;
    const { isPending, data } = useGetUser(uid);
    const { data: user } = data ?? {};

    if (isPending || !uid || !user) {
        return (
            <Avatar className={cn('relative', className)} size={size} {...otherProps}>
                <Skeleton className="absolute inset-0 h-full w-full rounded-full" />
            </Avatar>
        );
    }

    return <UserAvatarNoGet className={className} src={user.photo} size={size} {...otherProps} />;
}
