/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

/** constants */
import { AppKey } from '@modules/base/constants';

/** utils */
import { resetStores } from '@modules/base/utils/store';

/** services */
import { authService } from '@modules/auth/services';

export function useSignout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.signout,
        onSettled: () => {
            queryClient.clear();
            resetStores();
            Cookies.remove(AppKey.token);
            void navigate('/', { replace: true });
        },
    });
}
