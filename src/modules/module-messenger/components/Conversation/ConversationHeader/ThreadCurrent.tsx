/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams, useSearchParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

export function ThreadCurrent() {
    const { tid } = useParams();
    const [searchParams] = useSearchParams();
    const user = useAuthStore((store) => store.data.user);

    const isDraft = searchParams.get('draft') === 'true';
    const { data } = useGetThread(tid, isDraft);
    const { data: thread } = data ?? {};
    const { uids = [] } = thread ?? {};
    const peerId = uids.find((uid) => uid !== user?.uid)!;

    if (thread?.isGroup) {
        return (
            <div className={cn('flex w-full items-center', 'gap-2 px-2 py-4')}>
                <UserAvatar size="lg" name={thread?.name} src={thread?.avatar} />
                <UserName className="w-full" name={thread?.name} />
            </div>
        );
    }

    return (
        <div className={cn('flex w-full items-center', 'gap-2 px-2 py-4')}>
            <UserAvatar size="lg" uid={peerId} />
            <UserName className="w-full" uid={peerId} />
        </div>
    );
}
