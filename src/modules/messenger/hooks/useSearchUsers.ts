/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@modules/messenger/constants/query';

/** utils */
import { mapUserToThread } from '@modules/messenger/utils/threads';

/** services */
import { userServices } from '@modules/user/services/api';

/** stores */
import { useUserStore } from '@modules/user/stores/useUserStore';
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';

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
