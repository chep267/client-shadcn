/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useIntl } from 'react-intl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** services */
import { authService } from '@module-auth/services';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** types */
import type { AxiosError } from 'axios';

export function useSignin() {
    const { formatMessage } = useIntl();
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.signin,
        onSuccess: async (response) => {
            const { user } = response.data.data;
            Cookies.set(AppKey.uid, user.uid);
            Cookies.set(AppKey.email, `${user.email}`);
            authAction.setData({ user });
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            toast.error(formatMessage({ id: messageIntl, defaultMessage: messageIntl }));
        },
    });
}
