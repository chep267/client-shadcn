/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** constants */
import { AppKey } from '@module-base/constants/env';

/** services */
import { authService } from '@module-auth/services';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useSignout() {
    const queryClient = useQueryClient();
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.signout,
        onSettled: () => {
            queryClient.clear();
            Cookies.remove(AppKey.token);
            authAction.setData({ user: null, prePath: '/', token: '' });
        },
    });
}
