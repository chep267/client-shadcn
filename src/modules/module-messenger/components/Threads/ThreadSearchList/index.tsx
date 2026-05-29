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
import { useSearchThreads } from '@module-messenger/hooks/useSearchThreads';
import { useSearchUsers } from '@module-messenger/hooks/useSearchUsers';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadList/ThreadItem';

export function ThreadSearchList() {
    const params = useParams();
    const searchKey = useMessengerStore((store) => store.data.searchKey.trim());
    const { isFetching: loadingThreads, data: dataThreads } = useSearchThreads({ q: searchKey });
    const { isFetching: loadingUsers, data: dataUsers } = useSearchUsers({ q: searchKey });
    const threads = [...(dataThreads?.data ?? []), ...(dataUsers?.data ?? [])];

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            initialSetup={{
                loading: loadingThreads || loadingUsers,
            }}
            items={threads}
            itemContent={(index, thread) => (
                <ThreadItem
                    className={cn('border-b', {
                        'bg-main/50!': params.tid === thread.tid,
                    })}
                    data={thread}
                    hasOption={false}
                    isDraft={index >= (dataThreads?.data?.length ?? 0)}
                />
            )}
        />
    );
}
