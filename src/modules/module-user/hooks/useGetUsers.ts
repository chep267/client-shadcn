/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { UserQueryKey } from '@module-user/constants/query';

/** services */
import { userServices } from '@module-user/services/api';

/** stores */
import { useUserStore } from '@module-user/stores/useUserStore';

export function useGetUsers(payload: App.ModuleUser.Api.UserService['Gets']['Payload'] = {}) {
    return useQuery({
        queryKey: [UserQueryKey.users, payload],
        queryFn: async () => {
            const response = await userServices.gets(payload);
            useUserStore.getState().action.multiAdd(response.data);
            return response;
        },
    });
}
