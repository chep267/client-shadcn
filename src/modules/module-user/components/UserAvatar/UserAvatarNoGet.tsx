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
import { genAvatarFallbackFromName } from '@module-user/utils/user';

/** components */
import { Skeleton } from '@module-base/components/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@module-base/components/avatar';

interface UserAvatarNoGetProps extends React.ComponentProps<typeof Avatar> {
    src?: string;
    name?: string;
}

export function UserAvatarNoGet(props: UserAvatarNoGetProps) {
    const { className, size, src, name, ...otherProps } = props;
    const [loading, setLoading] = React.useState(true);

    const handleLoadingAvatar = (status: string) => {
        if (status === 'loaded' || status === 'error') {
            setLoading(false);
        }
    };

    return (
        <Avatar data-slot="user-avatar" className={cn('relative', className)} size={size} {...otherProps}>
            <AvatarImage
                className={cn({ 'opacity-0': loading })}
                alt={src ? `Avatar of ${name}` : `Fallback avatar of ${name}`}
                src={src}
                onLoadingStatusChange={handleLoadingAvatar}
            />
            <AvatarFallback className={cn({ 'opacity-0': loading })}>
                {name ? genAvatarFallbackFromName(name) : <UserIcon className="size-5" />}
            </AvatarFallback>
            {loading && <Skeleton className="absolute inset-0 h-full w-full rounded-full" />}
        </Avatar>
    );
}
