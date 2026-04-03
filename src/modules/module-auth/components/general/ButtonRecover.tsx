/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useRecover } from '@module-auth/hooks/useRecover';

/** components */
import { AuthButtonSubmit } from '@module-auth/components/general/AuthButtonSubmit';

export function ButtonRecover(props: App.ModuleAuth.Component.ButtonRecoverProps) {
    const { handleSubmit, onSubmitError: onError } = props;

    const { isPending, mutate } = useRecover();

    const onSubmit = handleSubmit((data) => {
        mutate(data, { onError });
    });

    return <AuthButtonSubmit mode="recover" loading={isPending} onClick={onSubmit} />;
}
