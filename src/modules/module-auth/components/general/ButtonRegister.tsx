/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister';

/** components */
import { Button } from '@module-base/components/button';
import { Spinner } from '@module-base/components/spinner';

/** types */
import type { AxiosError } from 'axios';
import type { UseFormHandleSubmit } from 'react-hook-form';

type TypeFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};
interface TypeButtonRegister {
    handleSubmit: UseFormHandleSubmit<TypeFormData>;
    onSubmitError: (error: AxiosError) => void;
}

export default function ButtonRegister(props: TypeButtonRegister) {
    const { handleSubmit, onSubmitError: onError, ...btnProps } = props;

    const hookRegister = useRegister();

    const onSubmit = handleSubmit((data) => {
        hookRegister.mutate(data, { onError });
    });

    return (
        <Button
            type="button"
            variant="outline"
            className={clsx('hover:text-main hover:border-main', 'mobile:w-1/3 w-full', {
                'text-main !border-main': hookRegister.isPending,
            })}
            size="lg"
            onClick={onSubmit}
            {...btnProps}
        >
            {hookRegister.isPending ? <Spinner /> : <FormattedMessage id={AuthLanguage.component.button.register} />}
        </Button>
    );
}
