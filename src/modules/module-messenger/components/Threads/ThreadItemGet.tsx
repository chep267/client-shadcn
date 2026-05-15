/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** components */
import { Skeleton } from '@module-base/components/skeleton';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadItem';

interface ThreadItemGetProps {
    className?: string;
    tid?: string;
}

export function ThreadItemGet(props: ThreadItemGetProps) {
    const { tid, className } = props;
    const { isPending, data } = useGetThread(tid);

    if (isPending || !data) return <Skeleton className="h-8 w-20" />;

    return <ThreadItem className={className} data={data} />;
}
