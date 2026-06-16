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
import { threadService } from '@module-messenger/services/thread';

/** stores */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

export function useGetThread(tid: string = '') {
    const thread = useThreadStore((store) => store.data.threads.get(tid) || store.data.searches.get(tid));

    return useQuery({
        queryKey: [MessengerQueryKey.thread, { tid }],
        queryFn: () => threadService.getOne({ tid }),
        initialData: () => {
            if (!thread) return;
            return {
                message: '',
                data: thread,
                metadata: {},
            };
        },
        enabled: !!tid && !thread,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
