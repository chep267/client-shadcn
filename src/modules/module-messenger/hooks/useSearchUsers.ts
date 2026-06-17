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
import { mapUserToThread } from '@module-messenger/utils/threads';

/** services */
import { userServices } from '@module-user/services/api';

/** stores */
import { useUserStore } from '@module-user/stores/useUserStore';
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

export function useSearchUsers(payload: App.ModuleMessenger.Api.ThreadService['Gets']['Payload'] = {}) {
    return useQuery({
        queryKey: [MessengerQueryKey.searchUsers, payload],
        queryFn: async () => {
            const response = await userServices.gets(payload);
            useUserStore.getState().action.multiAdd(response.data);
            const threads = response.data.map(mapUserToThread);
            useThreadStore.getState().action.multiSearch(threads);

            return {
                ...response,
                data: threads,
            };
        },
        enabled: !!payload?.q,
    });
}
