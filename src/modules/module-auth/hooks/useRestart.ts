/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
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

export function useRestart() {
    const { formatMessage } = useIntl();
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.restart,
        onSuccess: (response) => {
            const user = response.data.data;
            const { token } = response.data.metadata;
            Cookies.set(AppKey.token, token.value);
            authAction.setData({ user, token: token.value });
        },
        onError: async (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isClientError(error):
                    messageIntl = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }

            toast.error(formatMessage({ id: messageIntl, defaultMessage: messageIntl }));
            Cookies.remove(AppKey.token);
            authAction.setData({ user: null, prePath: '/' });
        },
    });
}
