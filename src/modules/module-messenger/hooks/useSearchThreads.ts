/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** services */
import { threadService } from '@module-messenger/services/thread';

/** stores */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

export function useSearchThreads(payload: App.ModuleMessenger.Api.ThreadControllerAction['Gets']['Payload'] = {}) {
    return useQuery({
        queryKey: [MessengerQueryKey.searchThreads, payload],
        queryFn: async () => {
            const {
                data: { searches },
                action: threadStoreAction,
            } = useThreadStore.getState();

            if (!payload?.q) {
                return {
                    message: '',
                    data: searches.values().toArray().reverse().slice(0, 5),
                    metadata: {},
                };
            }

            const response = await threadService.gets(payload);
            threadStoreAction.multiSearch(response.data);
            return response;
        },
    });
}
