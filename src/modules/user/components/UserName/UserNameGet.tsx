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
import { Typography } from '@modules/base/components/typography';
import { UserNameNoGet } from '@modules/user/components/UserName/UserNameNoGet';

export function UserNameGet(props: App.Module.User.Component.UserNameProps) {
    const { id, className, loading, ...otherProps } = props;
    const { isFetching, data } = useGetUser(id);
    const { data: user } = data ?? {};

    if (loading || isFetching) {
        return (
            <Typography className={cn('relative size-full min-h-5 max-w-20 min-w-10', className)} {...otherProps}>
                <Skeleton className="absolute inset-0 size-full" />
            </Typography>
        );
    }

    return <UserNameNoGet className={className} {...otherProps} name={user?.name} />;
}
