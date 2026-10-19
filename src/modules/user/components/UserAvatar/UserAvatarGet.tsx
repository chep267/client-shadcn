/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** hooks */
import { useGetUser } from '@modules/user/hooks/useGetUser';

/** components */
import { Skeleton } from '@modules/base/components/skeleton';
import { Avatar } from '@modules/base/components/avatar';
import { UserAvatarNoGet } from '@modules/user/components/UserAvatar/UserAvatarNoGet';

export function UserAvatarGet(props: App.Module.User.Component.UserAvatarProps) {
    const { id, className, loading, size, ...otherProps } = props;
    const { isFetching, data } = useGetUser(id);
    const { data: user } = data ?? {};

    if (loading || isFetching) {
        return (
            <Avatar className={cn('relative', className)} size={size} {...otherProps}>
                <Skeleton className="absolute inset-0 size-full rounded-full" />
            </Avatar>
        );
    }

    return <UserAvatarNoGet className={className} src={user?.photo} size={size} name={user?.name} {...otherProps} />;
}
