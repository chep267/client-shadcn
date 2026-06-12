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
    const users = useUserStore((store) => store.data.map);
    const user = users.get(uid);

    return useQuery({
        queryKey: [UserQueryKey.user, { uid }],
        queryFn: () => userServices.getOne({ uid }),
        enabled: !!uid && !user,
        initialData: () => {
            if (!user) return;
            return {
                message: '',
                data: user,
                metadata: {},
            };
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15,
    });
}
