/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** services */
import { userServices } from '@module-user/services';

export function useCreateUser() {
    return useMutation({
        mutationFn: userServices.create,
        onSuccess: () => {},
        onError: () => {},
    });
}
