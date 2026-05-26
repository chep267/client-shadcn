/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQueryClient } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

export function useGetThread(tid: string = '', isDraft = false) {
    const queryClient = useQueryClient();

    const cache = queryClient.getQueryData([
        isDraft ? MessengerQueryKey.cacheThreads : MessengerQueryKey.threads,
    ]) as App.ModuleMessenger.Api.GetThreads['Response'];

    const thread = cache?.data.find((thread) => {
        return thread.tid === tid;
    });

    return { data: { data: thread } };
}
