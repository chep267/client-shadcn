/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { Link } from 'react-router';

/** constants */
import { MessengerRouterPath } from '@modules/messenger/constants';

/** stores */
import { useAuthStore } from '@modules/auth/stores/useAuthStore';
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';

/** components */
import { UserAvatar } from '@modules/user/components/UserAvatar';
import { UserName } from '@modules/user/components/UserName';
import { ThreadOption } from '@modules/messenger/components/Threads/ThreadOption';
import { LastMessageText } from '@modules/messenger/components/Threads/ThreadList/LastMessageText';

interface ThreadItemContainerProps extends React.ComponentProps<'div'> {
    id: App.Module.Messenger.Data.Thread['id'];
    hasOption?: boolean;
    hasDescription?: boolean;
    hasLink?: boolean;
}

interface ThreadItemProps extends Omit<ThreadItemContainerProps, 'id'> {
    thread: App.Module.Messenger.Data.Thread;
}

function SingleThread(props: ThreadItemProps) {
    const { className, thread, hasOption = true, hasDescription = true, ...otherProps } = props;

    const meId = useAuthStore((store) => store.data.user!.id);
    const { uids, metadata } = thread;
    const { lastMessageId } = metadata ?? {};

    const peerId = uids.find((uid) => uid !== meId)!;

    return (
        <div
            data-slot="thread-item"
            className={cn(
                'group/thread-item',
                'flex items-center',
                'h-(--app-size-height-messenger-conversation-header) w-full gap-2 px-2',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
            {...otherProps}
        >
            <UserAvatar className="border" size="lg" id={peerId} />
            <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <UserName className="w-full" id={peerId} />
                {hasDescription ? <LastMessageText mid={lastMessageId} /> : null}
            </div>
            {hasOption ? <ThreadOption thread={thread} /> : null}
        </div>
    );
}

function GroupThread(props: ThreadItemProps) {
    const { className, thread, hasOption = true, hasDescription = true, ...otherProps } = props;
    const { lastMessageId } = thread.metadata;

    return (
        <div
            data-slot="thread-item"
            className={cn(
                'group/thread-item',
                'flex items-center',
                'h-(--app-size-height-messenger-conversation-header) w-full gap-2 px-2',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
            {...otherProps}
        >
            <UserAvatar className="border" size="lg" name={thread.name} src={thread.avatar} />
            <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <UserName className="w-full" name={thread.name} />
                {hasDescription ? <LastMessageText mid={lastMessageId} /> : null}
            </div>
            {hasOption ? <ThreadOption thread={thread} /> : null}
        </div>
    );
}

const ThreadItem = React.memo(function ThreadItem(props: ThreadItemContainerProps) {
    const { id, hasLink = true, ...otherProps } = props;
    const thread = useThreadStore((store) => store.data.threads.get(id) || store.data.searches.get(id));

    if (!thread) return null;

    const { isGroup } = thread?.metadata ?? {};
    const Comp = isGroup ? GroupThread : SingleThread;

    if (!hasLink) {
        return <Comp thread={thread} {...otherProps} />;
    }

    return (
        <Link to={`${MessengerRouterPath.home}/${id}`} className="overflow-hidden" replace>
            <Comp thread={thread} {...otherProps} />
        </Link>
    );
});

export { ThreadItem };
