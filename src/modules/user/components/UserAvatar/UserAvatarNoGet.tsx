/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { UserIcon } from 'lucide-react';

/** utils */
import { genAvatarFallbackFromName } from '@modules/user/utils/user';

/** components */
import { Skeleton } from '@modules/base/components/skeleton';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@modules/base/components/avatar';

export function UserAvatarNoGet(props: App.Module.User.Component.UserAvatarProps) {
    const { className, src, name, ...otherProps } = props;
    const [loading, setLoading] = React.useState(true);

    const handleLoadingAvatar = (status: string) => {
        if (status === 'loaded' || status === 'error') {
            setLoading(false);
        }
    };

    return (
        <Avatar data-slot="user-avatar" className={cn('relative', className)} {...otherProps}>
            <AvatarImage alt={`Avatar of ${name}`} src={src} onLoadingStatusChange={handleLoadingAvatar} />
            {loading ? (
                <Skeleton className="absolute inset-0 size-full rounded-full" />
            ) : (
                <>
                    <AvatarFallback>
                        {name ? genAvatarFallbackFromName(name) : <UserIcon className="size-5" />}
                    </AvatarFallback>
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </>
            )}
        </Avatar>
    );
}
