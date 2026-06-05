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
import { messengerService } from '@module-messenger/services';
import { threadsCache } from '@module-messenger/services/cache.ts';

export function useSearchThreads(payload?: App.ModuleMessenger.Api.GetThreads['Payload']) {
    return useQuery({
        queryKey: [MessengerQueryKey.searchThreads, payload],
        queryFn: () => {
            if (!payload?.q) {
                return {
                    message: '',
                    data: threadsCache.getRecentThreads(),
                    metadata: { timestamp: Date.now(), currentPage: 1, totalPages: 1, currentItems: 0, totalItems: 0 },
                };
            }
            return messengerService.getThreads(payload);
        },
    });
}
