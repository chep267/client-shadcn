/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQueryClient } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** hooks */
import { useCacheThreads } from '@module-messenger/hooks/useCacheThreads';

export function useGetThread(tid: string = '', isDraft = false) {
    const queryClient = useQueryClient();
    const { get } = useCacheThreads();

    if (isDraft) {
        return { data: { data: get(tid) } };
    }

    const cache = queryClient.getQueryData([
        MessengerQueryKey.threads,
    ]) as App.ModuleMessenger.Api.GetThreads['Response'];

    const thread = cache?.data.find((thread) => {
        return thread.tid === tid;
    });

    return { data: { data: thread } };
}
