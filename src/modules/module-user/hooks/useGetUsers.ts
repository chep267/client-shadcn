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
import { userServices } from '@module-user/services';

export function useGetUsers(payload?: App.ModuleUser.Api.GetUsers['Payload']) {
    return useQuery({
        queryKey: [UserQueryKey.users, payload],
        queryFn: () => userServices.getUsers(payload),
    });
}
