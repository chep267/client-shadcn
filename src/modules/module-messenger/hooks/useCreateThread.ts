/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { produce } from 'immer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { AuthLanguage } from '@module-auth/constants/language';
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** utils */
import { genCacheData } from '@module-messenger/utils/messages';

/** services */
import { threadService } from '@module-messenger/services/thread';

/** types */
import type { AxiosResponse } from 'axios';

export function useCreateThread() {
    const queryClient = useQueryClient();
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: threadService.create,
        onSuccess: (response) => {
            const { data: thread } = response;
            if (!thread) {
                return;
            }
            queryClient.setQueryData(
                [MessengerQueryKey.threads],
                (cache: AxiosResponse<App.ModuleMessenger.Api.ThreadControllerAction['Gets']['Response']>['data']) => {
                    if (!cache) {
                        return genCacheData([thread]);
                    }
                    return produce(cache, (draft) => {
                        draft.data.push(thread);
                        draft.metadata.currentItems++;
                        draft.metadata.totalItems++;
                    });
                }
            );
        },
        onError: () => {
            toast.error(
                formatMessage({
                    id: AuthLanguage.notify.server.error,
                    defaultMessage: AuthLanguage.notify.server.error,
                })
            );
        },
    });
}
