/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSearchUsers } from '@module-messenger/hooks/useSearchUsers';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Typography } from '@module-base/components/typography';
import { VirtualList } from '@module-base/components/virtual-list';
import { UserItem } from '@module-messenger/components/Threads/UserSearchList/UserItem';

export function UserSearchList() {
    const searchKey = useMessengerStore((store) => store.data.searchKey);
    const { isFetching, data } = useSearchUsers({ searchKey });
    const { data: users } = data ?? {};

    return (
        <VirtualList
            className="max-tablet:[&>div]:scrollbar-hidden"
            initialSetup={{
                loading: isFetching,
            }}
            components={{
                Header: () => (
                    <div className="border-t border-b p-2">
                        <Typography className="font-bold">Users</Typography>
                    </div>
                ),
            }}
            items={users}
            itemContent={(_index, user) => <UserItem className={cn('border-b')} data={user} />}
        />
    );
}
