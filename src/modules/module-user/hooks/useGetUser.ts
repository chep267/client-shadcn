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

export function useGetUser(uid: string = '') {
    const user = useUserStore((store) => store.data.users.get(uid));

    return useQuery({
        queryKey: [UserQueryKey.user, { uid }],
        queryFn: async () => {
            if (user) {
                return {
                    message: '',
                    data: user,
                    metadata: {},
                };
            }
            const response = await userServices.getOne({ uid });
            useUserStore.getState().action.add(response.data);
            return response;
        },
        enabled: !!uid,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
