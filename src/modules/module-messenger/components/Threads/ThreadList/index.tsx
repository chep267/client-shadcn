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
    const threadIds = Array.from(useThreadStore((store) => store.data.threadIds));

    React.useEffect(() => {
        const firstTid = threadIds[0];
        if (firstTid && !tid) {
            navigate(`${MessengerRouterPath.home}/${firstTid}`, { replace: true });
        }
    }, [threadIds, tid]);

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            setup={{
                loading: isPending || isFetchingNextPage,
            }}
            items={threadIds}
            computeItemKey={(_index, id) => id}
            itemContent={(_index, id) => {
                return (
                    <ThreadItem className="data-[active=true]:bg-main/50! border-b" id={id} data-active={tid === id} />
                );
            }}
            endReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage().then();
                }
            }}
        />
    );
}
