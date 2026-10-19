/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useRecover } from '@modules/auth/hooks/useRecover';

/** components */
import { AuthButtonSubmit } from '@modules/auth/components/general/AuthButtonSubmit';

export function ButtonRecover(props: App.Module.Auth.Component.ButtonRecoverProps) {
    const { handleSubmit, onSubmitError: onError } = props;

    const { isPending, mutate } = useRecover();

    const onSubmit = handleSubmit((data) => {
        mutate(data, { onError });
    });

    return <AuthButtonSubmit mode="recover" loading={isPending} onClick={onSubmit} />;
}
