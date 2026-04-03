/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useSignin } from '@module-auth/hooks/useSignin';

/** components */
import { AuthButtonSubmit } from '@module-auth/components/general/AuthButtonSubmit';

export function ButtonSignin(props: App.ModuleAuth.Component.ButtonSigninProps) {
    const { handleSubmit, onSubmitError: onError } = props;

    const { isPending, mutate } = useSignin();

    const onSubmit = handleSubmit((data) => {
        mutate(data, { onError });
    });

    return <AuthButtonSubmit mode="signin" loading={isPending} onClick={onSubmit} />;
}
