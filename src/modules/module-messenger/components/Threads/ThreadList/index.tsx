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

/** components */
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadList/ThreadItem';

export function ThreadList() {
    const navigate = useNavigate();
    const params = useParams();
    const { isPending, data } = useGetThreads();
    const { data: threads } = data ?? {};

    React.useEffect(() => {
        const fistThread = threads?.[0];
        if (fistThread && !params.tid) {
            navigate(`${MessengerRouterPath.home}/${fistThread.tid}`, { replace: true });
        }
    }, [threads, params.tid]);

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            initialSetup={{
                loading: isPending,
            }}
            items={threads}
            itemContent={(_index, thread) => (
                <ThreadItem
                    className={cn('border-b', {
                        'bg-main/50!': params.tid === thread.tid,
                    })}
                    data={thread}
                />
            )}
        />
    );
}
