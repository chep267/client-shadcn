/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';
import { ThreadOption } from '@module-messenger/components/Threads/ThreadOption';
import { FormattedMessage } from 'react-intl';

interface ThreadItemProps {
    className?: string;
    hasOption?: boolean;
    isDraft?: boolean;
    data: App.ModuleMessenger.Data.TypeThread;
}

function SingleThread(props: ThreadItemProps) {
    const { className, data, hasOption = true } = props;
    const user = useAuthStore((store) => store.data.user);
    const { uids, lastMessage } = data;
    const { uid, content = '' } = lastMessage ?? {};

    const peerId = uids.find((uid) => uid !== user?.uid)!;
    const sender = uid === user?.uid ? <FormattedMessage id="You" defaultMessage="You" /> : '';

    return (
        <div
            className={cn(
                'group/thread-item',
                'flex w-full items-center',
                'cursor-pointer gap-2 px-2 py-4',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
        >
            <UserAvatar className="border" size="lg" uid={peerId} />
            <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <UserName className="w-full" uid={peerId} />
                <span className={cn('text-muted-foreground truncate text-xs', { hidden: !content })}>
                    {sender}: {content}
                </span>
            </div>
            {hasOption ? <ThreadOption /> : null}
        </div>
    );
}

function GroupThread(props: ThreadItemProps) {
    const { className, data, hasOption = true } = props;

    return (
        <div
            className={cn(
                'group/thread-item',
                'flex w-full items-center',
                'cursor-pointer gap-2 px-2 py-4',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
        >
            <UserAvatar className="border" size="lg" name={data.name} src={data.avatar} />
            <UserName className="w-full" name={data.name} />
            {hasOption ? <ThreadOption /> : null}
        </div>
    );
}

export function ThreadItem(props: ThreadItemProps) {
    const { data, isDraft } = props;

    const Comp = data.isGroup ? GroupThread : SingleThread;

    return (
        <Link
            to={`${MessengerRouterPath.home}/${data.tid}${isDraft ? '?draft=true' : ''}`}
            className="overflow-hidden"
            key={data.tid}
            replace
        >
            <Comp {...props} />
        </Link>
    );
}
