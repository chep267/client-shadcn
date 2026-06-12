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
// import { threadsCache } from '@module-messenger/services/cache';

export function useSearchThreads(payload: App.ModuleMessenger.Api.ThreadControllerAction['Gets']['Payload'] = {}) {
    return useQuery({
        queryKey: [MessengerQueryKey.searchThreads, payload],
        queryFn: () => {
            // if (!payload?.q) {
            //     return {
            //         message: '',
            //         data: threadsCache.getRecentThreads(),
            //         metadata: { timestamp: Date.now(), currentPage: 1, totalPages: 1, currentItems: 0, totalItems: 0 },
            //     };
            // }
            return threadService.gets(payload);
        },
        enabled: !!payload?.q,
    });
}
