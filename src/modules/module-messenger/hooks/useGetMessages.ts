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

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useGetMessages(tid: string = '') {
    const user = useAuthStore((store) => store.data.user);

    const mockMessages = generateMockChat();
    const mockIds = mockMessages.map((item) => item.mid);

    const { isPending, data } = useQuery({
        queryKey: [MessengerQueryKey.messages, { uid: user?.uid }],
        queryFn: () => messengerService.getMessages({ tid }),
        // enabled: !!user?.uid,
        // initialData: { items: mockMessages, itemIds: mockIds },
    });

    return { isPending, data: data || { items: mockMessages, itemIds: mockIds } };
}
