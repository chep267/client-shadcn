/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

export function ThreadCurrent() {
    const { tid } = useParams();
    const { data } = useGetThread(tid);

    // const isGroup = data?.isGroup;

    return (
        <div className={cn('flex w-full items-center', 'gap-2 px-2 py-4')}>
            <UserAvatar size="lg" name={data?.name} src={data?.avatar} />
            <UserName className="w-full" name={data?.name} />
        </div>
    );
}
