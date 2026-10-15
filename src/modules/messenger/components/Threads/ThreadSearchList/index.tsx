/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router';

/** stores */
import { useMessengerStore } from '@modules/messenger/stores/useMessengerStore';

/** hooks */
import { useSearchThreads } from '@modules/messenger/hooks/useSearchThreads';
import { useSearchUsers } from '@modules/messenger/hooks/useSearchUsers';

/** components */
import { VirtualList } from '@modules/base/components/virtual-list';
import { ThreadItem } from '@modules/messenger/components/Threads/ThreadList/ThreadItem';

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
            computeItemKey={(_index, thread) => thread.id}
            itemContent={(_index, thread) => {
                return (
                    <ThreadItem
                        className="data-[active=true]:bg-main/50! border-b"
                        id={thread.id}
                        data-active={tid === thread.id}
                        hasOption={false}
                    />
                );
            }}
        />
    );
}
