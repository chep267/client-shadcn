/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';
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
        <Avatar className={cn('relative', className)} size={size} {...otherProps}>
            <AvatarImage
                className={cn({ 'opacity-0': loading })}
                alt={src ? `Avatar of ${name}` : `Fallback avatar of ${name}`}
                src={src}
                onLoadingStatusChange={handleLoadingAvatar}
            />
            <AvatarFallback className={cn({ 'opacity-0': loading })}>{genAvatarFallbackFromName(name)}</AvatarFallback>
            {loading && <Skeleton className="absolute inset-0 h-full w-full rounded-full" />}
        </Avatar>
    );
}
