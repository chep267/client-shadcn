/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

/** constants */
import { AppKey } from '@modules/base/constants/env';
import { AuthLanguage } from '@modules/auth/constants/language';

/** utils */
import { isClientError } from '@modules/base/utils/axiosHelper';

/** services */
import { authService } from '@modules/auth/services';

/** stores */
import { useAuthStore } from '@modules/auth/stores/useAuthStore';

/** types */
import type { AxiosError } from 'axios';

export function useSignin() {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const path = useAuthStore(({ data }) => data.prePath);
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.signin,
        onSuccess: async (response) => {
            const user = response.data.data;
            const { token } = response.data.metadata;
            Cookies.set(AppKey.email, user.email ?? '');
            Cookies.set(AppKey.token, token.value);
            authAction.setData({ user, token: token.value });
            void navigate(path, { replace: true });
        },
        onError: (error: AxiosError) => {
            let message: string;
            switch (true) {
                case isClientError(error):
                    message = AuthLanguage.notify.signin.error;
                    break;
                default:
                    message = AuthLanguage.notify.server.error;
            }
            toast.error(formatMessage({ id: message, defaultMessage: message }));
        },
    });
}
