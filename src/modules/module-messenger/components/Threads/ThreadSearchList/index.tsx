/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** hooks */
import { useSearchThreads } from '@module-messenger/hooks/useSearchThreads';
import { useSearchUsers } from '@module-messenger/hooks/useSearchUsers';

/** components */
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadList/ThreadItem';

export function ThreadSearchList() {
    const { tid = '' } = useParams();
    const searchKey = useMessengerStore((store) => store.data.searchKey.trim());
    const searchThreads = useSearchThreads({ q: searchKey });
    const searchUsers = useSearchUsers({ q: searchKey });
    const threads = [...(searchThreads.data?.data ?? []), ...(searchUsers.data?.data ?? [])];

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            setup={{
                loading: searchThreads.isFetching || searchUsers.isFetching,
            }}
            items={threads}
            itemContent={(index, thread) => (
                <ThreadItem
                    key={index}
                    className={cn('border-b', {
                        'bg-main/50!': tid === thread.id,
                    })}
                    data={thread}
                    hasOption={false}
                />
            )}
        />
    );
}
