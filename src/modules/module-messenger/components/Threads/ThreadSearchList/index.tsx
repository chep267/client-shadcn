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
import { Typography } from '@module-base/components/typography';
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadList/ThreadItem';

export function ThreadSearchList() {
    const searchKey = useMessengerStore((store) => store.data.searchKey);
    const { isFetching, data } = useSearchThreads({ searchKey });
    const { data: threads } = data ?? {};

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            initialSetup={{
                loading: isFetching,
            }}
            components={{
                Header: () => (
                    <div className="border-b p-2">
                        <Typography className="font-bold">Threads</Typography>
                    </div>
                ),
            }}
            items={threads}
            itemContent={(_index, thread) => <ThreadItem className={cn('border-b')} data={thread} />}
        />
    );
}
