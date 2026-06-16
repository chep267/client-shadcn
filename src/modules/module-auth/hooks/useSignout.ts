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

/** utils */
import { resetStores } from '@module-base/utils/store';

/** services */
import { authService } from '@module-auth/services';

export function useSignout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.signout,
        onSettled: () => {
            queryClient.clear();
            resetStores();
            Cookies.remove(AppKey.token);
        },
    });
}
