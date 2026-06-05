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

export function useGetMessages(tid: string = '') {
    return useQuery({
        queryKey: [MessengerQueryKey.messages, { tid }],
        queryFn: async () => {
            const response = await messengerService.getMessages({ tid });
            return {
                ...response,
                data: response.data.reverse(),
            };
        },
        enabled: !!tid,
    });
}
