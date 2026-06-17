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
import { LastMessageText } from '@module-messenger/components/Threads/ThreadList/LastMessageText';

interface ThreadItemProps {
    className?: string;
    hasOption?: boolean;
    data: App.ModuleMessenger.Data.Thread;
}

function SingleThread(props: ThreadItemProps) {
    const { className, data, hasOption = true } = props;

    const meId = useAuthStore((store) => store.data.user!.id);
    const { uids, metadata } = data;
    const { lastMessageId } = metadata ?? {};

    const peerId = uids.find((uid) => uid !== meId)!;

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
                <LastMessageText mid={lastMessageId} />
            </div>
            {hasOption ? <ThreadOption thread={data} /> : null}
        </div>
    );
}

function GroupThread(props: ThreadItemProps) {
    const { className, data, hasOption = true } = props;
    const { lastMessageId } = data.metadata;

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
            <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <UserName className="w-full" name={data.name} />
                <LastMessageText mid={lastMessageId} />
            </div>
            {hasOption ? <ThreadOption thread={data} /> : null}
        </div>
    );
}

export function ThreadItem(props: ThreadItemProps) {
    const { data } = props;
    const { isGroup } = data.metadata ?? {};

    const Comp = isGroup ? GroupThread : SingleThread;

    return (
        <Link to={`${MessengerRouterPath.home}/${data.id}`} className="overflow-hidden" key={data.id} replace>
            <Comp {...props} />
        </Link>
    );
}
