/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@modules/messenger/constants';

/** services */
import { threadService } from '@modules/messenger/services/thread';

/** stores */
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';

export function useSearchThreads(payload: App.Module.Messenger.Api.ThreadService['Gets']['Payload'] = {}) {
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
