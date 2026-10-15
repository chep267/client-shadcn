/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';

/** constants */
import { MessengerRouterPath } from '@modules/messenger/constants/path';

/** hooks */
import { useGetThreads } from '@modules/messenger/hooks/useGetThreads';

/** stores */
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';

/** components */
import { VirtualList } from '@modules/base/components/virtual-list';
import { ThreadItem } from '@modules/messenger/components/Threads/ThreadList/ThreadItem';

export function ThreadList() {
    const navigate = useNavigate();
    const { tid = '' } = useParams();
    const { isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetThreads();
    const threadIds = Array.from(useThreadStore((store) => store.data.threadIds));

    React.useEffect(() => {
        const firstTid = threadIds[0];
        if (firstTid && !tid) {
            void navigate(`${MessengerRouterPath.home}/${firstTid}`, { replace: true });
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
                    void fetchNextPage();
                }
            }}
        />
    );
}
