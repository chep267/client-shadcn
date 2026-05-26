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

export function useGetUser(uid: string = '') {
    return useQuery({
        queryKey: [UserQueryKey.user, uid],
        queryFn: () => userServices.getUser({ uid }),
        enabled: !!uid,
    });
}
