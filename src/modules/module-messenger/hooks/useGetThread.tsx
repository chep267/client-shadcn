/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery, useQueryClient } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** services */
import { messengerService } from '@module-messenger/services';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useGetThread(tid: string = '') {
    const queryClient = useQueryClient();
    const user = useAuthStore((store) => store.data.user);

    const getCache = () => {
        const cache = queryClient.getQueryData([
            MessengerQueryKey.threads,
            { uid: user?.uid },
        ]) as App.ModuleMessenger.Api.TypeApi['GetThreads']['Response']['data'];

        return cache?.items?.find((thread) => {
            return thread.tid === tid;
        });
    };

    const { data } = useQuery({
        queryKey: [MessengerQueryKey.thread],
        queryFn: () => messengerService.getThread({ tid }),
        enabled: !!user?.uid && !!tid,
    });

    return { isPending: false, data: data || getCache() };
}
