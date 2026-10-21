/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { AppKey } from '@modules/base/constants/env';
import { AuthLanguage } from '@modules/auth/constants';

/** utils */
import { isClientError } from '@modules/base/utils/axiosHelper';

/** services */
import { authService } from '@modules/auth/services';

/** stores */
import { useAuthStore } from '@modules/auth/stores/useAuthStore';

/** types */
import type { AxiosError } from 'axios';

export function useRestart() {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const path = useAuthStore(({ data }) => data.prePath);
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.restart,
        onSuccess: (response) => {
            const user = response.data.data;
            const { token } = response.data.metadata;
            Cookies.set(AppKey.token, token.value);
            authAction.setData({ user, token: token.value });
            void navigate(path, { replace: true });
        },
        onError: async (error: AxiosError) => {
            let message: string;
            switch (true) {
                case isClientError(error):
                    message = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    message = AuthLanguage.notify.server.error;
            }

            toast.error(formatMessage({ id: message, defaultMessage: message }));
            Cookies.remove(AppKey.token);
            authAction.setData({ user: null, token: undefined });
        },
    });
}
