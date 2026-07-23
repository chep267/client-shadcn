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

/** stores */
import { useMessageStore } from '@module-messenger/stores/useMessageStore';

export function useGetMessage(mid = '') {
    const message = useMessageStore((store) => store.data.messages.get(mid));

    return useQuery({
        queryKey: [MessengerQueryKey.message, { mid }],
        queryFn: () => {
            if (message) {
                return {
                    message: '',
                    data: message,
                    metadata: {},
                };
            }
            return messageService.getOne({ mid });
        },
        enabled: !!mid,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
