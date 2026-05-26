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

export function useSearchUsers(payload?: App.ModuleUser.Api.GetUsers['Payload']) {
    return useQuery({
        queryKey: [MessengerQueryKey.searchUsers, payload],
        queryFn: () => userServices.getUsers(payload),
        enabled: !!payload?.searchKey,
    });
}
