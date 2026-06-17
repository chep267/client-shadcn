/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

export function ThreadCurrent() {
    const { tid = '' } = useParams();
    const meId = useAuthStore((store) => store.data.user!.id);
    const { data } = useGetThread(tid);
    const { data: thread } = data ?? {};

    const { name, avatar, uids = [], metadata } = thread ?? {};
    const { isGroup } = metadata ?? {};
    const peerId = uids.find((uid) => uid !== meId)!;

    if (!tid) return <div />;

    return (
        <div className="flex flex-1 flex-col items-center gap-2 p-4">
            <UserAvatar
                className="size-28 [&>span]:data-[slot=avatar-fallback]:text-4xl"
                name={name}
                src={avatar}
                uid={isGroup ? '' : peerId}
                loading={!tid}
            />
            <UserName name={name} uid={isGroup ? '' : peerId} loading={!tid} />
        </div>
    );
}
