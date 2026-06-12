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
import { userServices } from '@module-user/services/api';

/** stores */
import { useUserStore } from '@module-user/stores/useUserStore';

export function useSearchUsers(payload: App.ModuleUser.Api.UserControllerAction['Gets']['Payload'] = {}) {
    const userStoreAction = useUserStore((store) => store.action);

    return useQuery({
        queryKey: [MessengerQueryKey.searchUsers, payload],
        queryFn: async () => {
            const response = await userServices.gets(payload);
            response.data?.forEach(userStoreAction.add);
            return response;
        },
        enabled: !!payload?.q,
    });
}
