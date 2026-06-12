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
import { MessengerQueryKey } from '@module-messenger/constants/query';

/** utils */
import { genCacheData } from '@module-messenger/utils/messages';

/** services */
import { messageService } from '@module-messenger/services/message';

/** types */
import type { AxiosError, AxiosResponse } from 'axios';

export function usePostMessage() {
    const queryClient = useQueryClient();
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messageService.create,
        onSuccess: (response) => {
            const { data: message } = response;
            // update cache messages
            queryClient.setQueryData(
                [MessengerQueryKey.messages, { id: message.id }],
                (cache: AxiosResponse<App.ModuleMessenger.Api.MessageControllerAction['Gets']['Response']>['data']) => {
                    if (!cache) {
                        return genCacheData([message]);
                    }
                    return produce(cache, (draft) => {
                        draft.data.push(message);
                        draft.metadata.currentItems++;
                        draft.metadata.totalItems++;
                    });
                }
            );

            // update cache threads
            queryClient.setQueryData(
                [MessengerQueryKey.threads],
                (cache: AxiosResponse<App.ModuleMessenger.Api.ThreadControllerAction['Gets']['Response']>['data']) => {
                    if (!cache) {
                        return genCacheData([]);
                    }
                    return produce(cache, (draft) => {
                        const thread = draft.data.find((item) => item.id === message.id);
                        if (thread) {
                            thread.metadata.lastMessageId = message.id;
                        }
                    });
                }
            );
        },
        onError: (_error: AxiosError) => {
            toast.error(formatMessage({ id: '', defaultMessage: 'Có lỗi xảy ra' }));
        },
    });
}
