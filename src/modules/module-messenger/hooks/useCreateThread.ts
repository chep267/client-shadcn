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
import { isClientError } from '@module-base/utils/axios';

/** services */
import { messengerService } from '@module-messenger/services';

/** types */
import type { AxiosError, AxiosResponse } from 'axios';

export function useCreateThread() {
    const queryClient = useQueryClient();
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messengerService.createThread,
        onSuccess: (response) => {
            const { data: thread } = response;
            queryClient.setQueryData(
                [MessengerQueryKey.threads],
                (cache: AxiosResponse<App.ModuleMessenger.Api.GetThreads['Response']>) => {
                    return produce(cache, (draft) => {
                        draft.data.data.push(thread);
                    });
                }
            );
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isClientError(error):
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            toast.error(formatMessage({ id: messageIntl, defaultMessage: messageIntl }));
        },
    });
}
