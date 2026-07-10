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
import { isClientError } from '@module-base/utils/axiosHelper';

/** services */
import { authService } from '@module-auth/services';

/** types */
import type { AxiosError } from 'axios';

export function useRegister() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            toast.success(formatMessage({ id: AuthLanguage.notify.register.success, defaultMessage: 'Success' }));
        },
        onError: (error: AxiosError) => {
            let message: string;
            switch (true) {
                case isClientError(error):
                    message = AuthLanguage.notify.register.error;
                    break;
                default:
                    message = AuthLanguage.notify.server.error;
            }
            toast.error(formatMessage({ id: message, defaultMessage: message }));
        },
    });
}
