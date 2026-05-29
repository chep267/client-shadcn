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

/** hooks */
import { useCacheThreads } from '@module-messenger/hooks/useCacheThreads';

export function useSearchUsers(payload?: App.ModuleUser.Api.GetUsers['Payload']) {
    const { multiAdd, getRecentThreads } = useCacheThreads();

    const { isFetching, data } = useQuery({
        queryKey: [MessengerQueryKey.searchUsers, payload],
        queryFn: () => userServices.getUsers(payload),
        enabled: !!payload?.q,
    });

    return { isFetching, data: { data: payload?.q ? multiAdd(data?.data) : getRecentThreads() } };
}
