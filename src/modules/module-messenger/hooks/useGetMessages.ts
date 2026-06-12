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
import { messageService } from '@module-messenger/services/message';

export function useGetMessages(tid: string = '') {
    return useQuery({
        queryKey: [MessengerQueryKey.messages, { tid }],
        queryFn: async () => {
            const response = await messageService.gets({ tid });
            return {
                ...response,
                data: response.data?.reverse(),
            };
        },
        enabled: !!tid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15,
    });
}
