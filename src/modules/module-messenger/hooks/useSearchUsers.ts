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
import { userServices } from '@module-user/services';
import { threadsCache } from '@module-messenger/services/cache';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useSearchUsers(payload?: App.ModuleUser.Api.GetUsers['Payload']) {
    const meId = useAuthStore((store) => store.data.user?.uid ?? '');

    return useQuery({
        queryKey: [MessengerQueryKey.searchUsers, payload],
        queryFn: async () => {
            const response = await userServices.getUsers(payload);
            return {
                ...response,
                data: response.data.map((user) => threadsCache.add(user, meId)),
            };
        },
        enabled: !!payload?.q,
    });
}
