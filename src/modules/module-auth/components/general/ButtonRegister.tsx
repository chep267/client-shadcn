/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister';

/** components */
import { AuthButtonSubmit } from '@module-auth/components/general/AuthButtonSubmit';

export function ButtonRegister(props: App.ModuleAuth.Component.ButtonRegisterProps) {
    const { handleSubmit, onSubmitError: onError } = props;

    const { isPending, mutate } = useRegister();

    const onSubmit = handleSubmit((data) => {
        mutate(data, { onError });
    });

    return <AuthButtonSubmit mode="register" loading={isPending} onClick={onSubmit} />;
}
