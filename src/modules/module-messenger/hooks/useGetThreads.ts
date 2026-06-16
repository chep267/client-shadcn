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
import { threadService } from '@module-messenger/services/thread';

/** stores */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

export function useGetThreads() {
    return useInfiniteQuery({
        queryKey: [MessengerQueryKey.threads],
        queryFn: async ({ pageParam: page = 1 }) => {
            const response = await threadService.gets({ page });
            useThreadStore.getState().action.multiAdd(response.data);
            return response;
        },
        getNextPageParam: (lastPage) => {
            const { currentPage = 1, totalPages = 1 } = lastPage.metadata;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
