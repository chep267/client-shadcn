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

interface ThreadItemProps {
    className?: string;
    data: App.ModuleMessenger.Data.TypeThread;
}

function SingleThread(props: ThreadItemProps) {
    const { className, data } = props;
    const user = useAuthStore((store) => store.data.user);
    const { uids } = data;

    const peerId = uids.find((uid) => uid !== user?.uid)!;

    return (
        <div
            className={cn(
                'flex w-full items-center',
                'cursor-pointer gap-2 px-2 py-4',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
        >
            <UserAvatar size="lg" uid={peerId} />
            <UserName className="w-full" uid={peerId} />
            <ThreadOption />
        </div>
    );
}

function GroupThread(props: ThreadItemProps) {
    const { className, data } = props;

    return (
        <div
            className={cn(
                'group/thread flex w-full items-center',
                'cursor-pointer gap-2 px-2 py-4',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
        >
            <UserAvatar size="lg" name={data.name} src={data.avatar} />
            <UserName className="w-full" name={data.name} />
            <ThreadOption />
        </div>
    );
}

export function ThreadItem(props: ThreadItemProps) {
    const { data } = props;

    const Comp = data.isGroup ? GroupThread : SingleThread;

    return (
        <Link to={`${MessengerRouterPath.home}/${data.tid}`} className="overflow-hidden" key={data.tid} replace>
            <Comp {...props} />
        </Link>
    );
}
