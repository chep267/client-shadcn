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
import { messengerService } from '@module-messenger/services';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useSearchThreads(payload: App.ModuleMessenger.Api.TypeApi['GetThreads']['Payload']) {
    const user = useAuthStore((store) => store.data.user);
    const uid = user?.uid ?? '';

    const { isPending, data } = useQuery({
        queryKey: [MessengerQueryKey.searchThreads, payload],
        queryFn: () => messengerService.getThreads({ uid, ...payload }),
        enabled: !!uid,
    });

    return { isPending, data };
}
