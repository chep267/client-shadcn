import { Avatar, AvatarFallback, AvatarImage } from '@module-base/components/avatar';
import React from 'react';
import { Skeleton } from '@module-base/components/skeleton';
import { cn } from '@module-base/utils/shadcn';

export function Assignee({ name = '', avatar }: { name?: string; avatar?: string }) {
    const [loading, setLoading] = React.useState(true);

    const handleLoadingAvatar = (status: string) => {
        if (status === 'loaded' || status === 'error') {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Avatar className="relative" size="default">
                <AvatarImage
                    className={cn({ 'opacity-0': loading })}
                    alt={avatar ? `Avatar of ${name}` : `Fallback avatar of ${name}`}
                    src={avatar}
                    onLoadingStatusChange={handleLoadingAvatar}
                />
                <AvatarFallback className={cn({ 'opacity-0': loading })}>{getInitials(name)}</AvatarFallback>
                {loading && <Skeleton className="absolute inset-0 h-full w-full rounded-full" />}
            </Avatar>
            {loading ? <Skeleton className="h-5 w-24" /> : <span className="text-sm font-medium">{name}</span>}
        </div>
    );
}

function getInitials(name?: string) {
    return name
        ?.split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
