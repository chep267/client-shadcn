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

export function useGetMessage(mid: string = '') {
    const message = useMessageStore((store) => store.data.messages.get(mid));

    return useQuery({
        queryKey: [MessengerQueryKey.message, { mid }],
        queryFn: () => messageService.getOne({ mid }),
        initialData: () => {
            if (!message) return;
            return {
                message: '',
                data: message,
                metadata: {},
            };
        },
        enabled: !!mid && !message,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
