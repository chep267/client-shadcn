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
import { messengerService } from '@module-messenger/services';

/** types */
import type { AxiosError, AxiosResponse } from 'axios';

export function usePostMessage() {
    const queryClient = useQueryClient();
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messengerService.postMessage,
        onSuccess: (response) => {
            const { data: message } = response;
            // update cache messages
            queryClient.setQueryData(
                [MessengerQueryKey.messages, { tid: message.tid }],
                (cache: AxiosResponse<App.ModuleMessenger.Api.GetMessages['Response']>['data']) => {
                    if (!cache) {
                        return genCacheData([message]);
                    }
                    return produce(cache, (draft) => {
                        draft.data.push(message);
                    });
                }
            );

            // update cache threads
            queryClient.setQueryData(
                [MessengerQueryKey.threads],
                (cache: AxiosResponse<App.ModuleMessenger.Api.GetThreads['Response']>['data']) => {
                    if (!cache) {
                        return genCacheData([]);
                    }
                    return produce(cache, (draft) => {
                        const thread = draft.data.find((item) => item.tid === message.tid);
                        if (thread) {
                            thread.lastMessage = {
                                uid: message.uid,
                                mid: message.mid,
                                status: message.status,
                                createdAt: message.createdAt!,
                                content: message.content,
                            };
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
