/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { MessengerQueryKey } from '@modules/messenger/constants';

/** services */
import { threadService } from '@modules/messenger/services/thread';

/** stores */
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';

export function useGetThread(tid = '') {
    const thread = useThreadStore((store) => store.data.threads.get(tid) || store.data.searches.get(tid));

    return useQuery({
        queryKey: [MessengerQueryKey.thread, { tid }],
        queryFn: () => {
            if (thread) {
                return {
                    message: '',
                    data: thread,
                    metadata: {},
                };
            }
            return threadService.getOne({ tid });
        },
        enabled: !!tid,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 15,
    });
}
