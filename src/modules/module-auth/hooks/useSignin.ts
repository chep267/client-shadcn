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
import { AppKey } from '@module-base/constants/env';
import { AuthLanguage } from '@module-auth/constants/language';

/** utils */
import { isClientError } from '@module-base/utils/axiosHelper';

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
            const user = response.data.data;
            const { token } = response.data.metadata;
            Cookies.set(AppKey.email, user.email ?? '');
            Cookies.set(AppKey.token, token.value);
            authAction.setData({ user, token: token.value });
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isClientError(error):
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            toast.error(formatMessage({ id: messageIntl, defaultMessage: messageIntl }));
        },
    });
}
