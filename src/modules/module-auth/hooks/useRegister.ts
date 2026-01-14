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
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** services */
import { authService } from '@module-auth/services';

/** types */
import type { AxiosError } from 'axios';

export function useRegister() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            toast.success(formatMessage({ id: AuthLanguage.notify.register.success }));
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            toast.error(formatMessage({ id: messageIntl, defaultMessage: messageIntl }));
        },
    });
}
