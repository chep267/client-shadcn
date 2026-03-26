import { Avatar, AvatarFallback, AvatarImage } from '@module-base/components/avatar';

export function User({ name, avatar }: { name: string; avatar?: string }) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
                <AvatarImage src={avatar} />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>

            <span className="text-sm font-medium">{name}</span>
        </div>
    );
}

function getInitials(name: string) {
    return name
        ?.split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
