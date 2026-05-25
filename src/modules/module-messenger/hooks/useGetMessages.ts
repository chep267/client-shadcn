/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** utils */
import { generateMockChat } from '@module-messenger/utils/mock';

/** services */
import { messengerService } from '@module-messenger/services';

export function useGetMessages(tid: string = '') {
    const mockMessages = generateMockChat();
    const mockIds = mockMessages.map((item) => item.mid);

    const { isPending, data } = useQuery({
        queryKey: [MessengerQueryKey.messages],
        queryFn: () => messengerService.getMessages({ tid }),
        enabled: !!tid,
    });

    return { isPending, data: data || { items: mockMessages, itemIds: mockIds } };
}
