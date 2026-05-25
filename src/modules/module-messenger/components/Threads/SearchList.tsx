/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSearchThreads } from '@module-messenger/hooks/useSearchThreads';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadItem';

export function SearchList() {
    const searchKey = useMessengerStore((store) => store.data.searchKey);
    const { isPending, data } = useSearchThreads({ searchKey });
    const items = data?.items;

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            initialSetup={{
                loading: isPending,
            }}
            items={items}
            itemContent={(index, thread) => (
                <ThreadItem
                    className={cn({
                        'border-t': index > 0,
                    })}
                    data={thread}
                />
            )}
        />
    );
}
