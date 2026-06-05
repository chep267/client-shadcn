/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQueryClient } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** services */
import { threadsCache } from '@module-messenger/services/cache';

export function useGetThread(tid: string = '', isDraft = false) {
    const queryClient = useQueryClient();

    if (isDraft) {
        return { data: threadsCache.get(tid) };
    }

    const cache = queryClient.getQueryData<App.ModuleMessenger.Api.GetThreads['Response']>([MessengerQueryKey.threads]);

    const thread = cache?.data.find((thread) => {
        return thread.tid === tid;
    });

    return { data: thread };
}
