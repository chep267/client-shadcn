/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useInfiniteQuery } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** services */
import { messageService } from '@module-messenger/services/message';

/** stores */
import { useMessageStore } from '@module-messenger/stores/useMessageStore';

export function useGetMessages(tid = '') {
    return useInfiniteQuery({
        queryKey: [MessengerQueryKey.messages, { tid }],
        queryFn: async ({ pageParam: page = 1 }) => {
            const response = await messageService.gets({ tid, page });
            useMessageStore.getState().action.multiAdd(tid, response.data);
            return response;
        },
        getNextPageParam: (lastPage) => {
            const { currentPage = 1, totalPages = 1 } = lastPage.metadata;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: !!tid,
        initialPageParam: 1,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
