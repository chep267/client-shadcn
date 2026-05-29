/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { AuthLanguage } from '@module-auth/constants/language';

/** utils */
import { isClientError } from '@module-base/utils/axios';

/** services */
import { messengerService } from '@module-messenger/services';

/** types */
import type { AxiosError } from 'axios';

export function usePostMessage() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messengerService.postMessage,
        onSuccess: () => {
            // toast.success(formatMessage({ id: '', defaultMessage: 'Success' }));
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
