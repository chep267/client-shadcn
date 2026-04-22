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

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { Avatar, AvatarFallback, AvatarImage } from '@module-base/components/avatar';
import { Skeleton } from '@module-base/components/skeleton';

export function MyAvatar(props: React.ComponentProps<typeof Avatar>) {
    const { className, size } = props;

    const [loading, setLoading] = React.useState(true);
    const user = useAuthStore((store) => store.data.user);
    const avatar = user?.photo ?? '';
    const name = user?.name ?? '';

    const handleLoadingAvatar = (status: string) => {
        if (status === 'loaded' || status === 'error') {
            setLoading(false);
        }
    };

    return (
        <Avatar className={cn('relative', className)} size={size}>
            <AvatarImage
                className={cn({ 'opacity-0': loading })}
                alt={avatar ? `Avatar of ${name}` : `Fallback avatar of ${name}`}
                src={avatar}
                onLoadingStatusChange={handleLoadingAvatar}
            />
            <AvatarFallback className={cn({ 'opacity-0': loading })}>{genAvatarFallbackFromName(name)}</AvatarFallback>
            {loading && <Skeleton className="absolute inset-0 h-full w-full rounded-full" />}
        </Avatar>
    );
}
