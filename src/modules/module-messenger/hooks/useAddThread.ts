/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQueryClient } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useAddThreadByUser() {
    const queryClient = useQueryClient();
    const meId = useAuthStore((store) => store.data.user?.uid ?? '');

    const add = (user: App.ModuleUser.Data.TypeUser) => {
        queryClient.setQueryData<App.ModuleMessenger.Api.GetThreads['Response']>(
            [MessengerQueryKey.cacheThreads],
            (current) => {
                const newThread: App.ModuleMessenger.Data.TypeThread = {
                    tid: user.uid.replace('uid', 'tid'),
                    name: '',
                    avatar: '',
                    isGroup: false,
                    uids: [user.uid, meId],
                    unreadCounts: [],
                    updatedAt: '',
                };

                const threads: Array<App.ModuleMessenger.Data.TypeThread> = current?.data ?? [];
                threads.push(newThread);
                return {
                    message: '',
                    data: threads,
                    metadata: {
                        timestamp: Date.now(),
                    },
                };
            }
        );
    };

    return {
        mutate: add,
    };
}
