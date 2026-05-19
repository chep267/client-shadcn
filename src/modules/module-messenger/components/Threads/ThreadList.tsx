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
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadItem';

export function ThreadList() {
    const navigate = useNavigate();
    const params = useParams();
    const {
        isPending,
        data: { items },
    } = useGetThreads();
    const searchKey = useMessengerStore((store) => store.data.searchKey);

    React.useEffect(() => {
        if (items && !params.tid) {
            const firstConversation = items[0];
            navigate(`${MessengerRouterPath.home}/${firstConversation.tid}`, { replace: true });
        }
    }, [items, params.tid]);

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            initialSetup={{
                loading: isPending,
                searchKey,
            }}
            items={items}
            itemContent={(index, thread) => (
                <ThreadItem
                    className={cn({
                        'border-t': index > 0,
                        'bg-main/50!': params.tid === thread.tid,
                    })}
                    data={thread}
                />
            )}
        />
    );
}
