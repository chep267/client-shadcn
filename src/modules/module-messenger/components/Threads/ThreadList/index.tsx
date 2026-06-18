/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetThreads } from '@module-messenger/hooks/useGetThreads';

/** stores */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

/** components */
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadList/ThreadItem';

export function ThreadList() {
    const navigate = useNavigate();
    const { tid = '' } = useParams();
    const { isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetThreads();

    const threads = useThreadStore((store) => store.data.threads)
        .values()
        .toArray();

    React.useEffect(() => {
        const fistThread = threads?.[0];
        if (fistThread && !tid) {
            navigate(`${MessengerRouterPath.home}/${fistThread.id}`, { replace: true });
        }
    }, [threads, tid]);

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            setup={{
                loading: isPending || isFetchingNextPage,
            }}
            items={threads}
            itemContent={(_index, thread) => (
                <ThreadItem
                    className={cn('border-b', {
                        'bg-main/50!': tid === thread.id,
                    })}
                    data={thread}
                />
            )}
            endReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage().then();
                }
            }}
        />
    );
}
