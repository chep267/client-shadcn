/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

export function ThreadCurrent() {
    const { tid = '' } = useParams();
    // const isDraft = tid.startsWith('uid.');
    const user = useAuthStore((store) => store.data.user);
    const { data } = useGetThread(tid);
    const { data: thread } = data ?? {};

    const { name, avatar, uids = [], metadata } = thread ?? {};
    const peerId = uids.find((uid) => uid !== user?.id)!;

    if (metadata?.isGroup) {
        return (
            <div className={cn('flex w-full items-center', 'gap-2 px-2 py-4')}>
                <UserAvatar size="lg" name={name} src={avatar} />
                <UserName className="w-full" name={name} />
            </div>
        );
    }

    return (
        <div className={cn('flex w-full items-center', 'gap-2 px-2 py-4')}>
            <UserAvatar size="lg" uid={peerId} loading={!tid} />
            <UserName className="w-full" uid={peerId} loading={!tid} />
        </div>
    );
}
