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
        queryKey: [MessengerQueryKey.messages],
        queryFn: () => messengerService.getMessages({ tid }),
        enabled: !!tid,
    });
}
