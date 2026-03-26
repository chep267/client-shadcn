/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSignin } from '@module-auth/hooks/useSignin';

/** components */
import { Button } from '@module-base/components/button';
import { Spinner } from '@module-base/components/spinner';

/** types */
import type { AxiosError } from 'axios';
import type { UseFormHandleSubmit } from 'react-hook-form';

type TypeFormData = {
    email: string;
    password: string;
};
interface TypeButtonSignin {
    handleSubmit: UseFormHandleSubmit<TypeFormData>;
    onSubmitError: (error: AxiosError) => void;
}

export default function ButtonSignin(props: TypeButtonSignin) {
    const { handleSubmit, onSubmitError: onError, ...btnProps } = props;

    const hookSignin = useSignin();

    const onSubmit = handleSubmit((data) => {
        hookSignin.mutate(data, { onError });
    });

    return (
        <Button
            type="button"
            variant="outline"
            className={cn('hover:text-main hover:border-main', 'mobile:w-1/3 w-full', {
                'text-main !border-main': hookSignin.isPending,
            })}
            size="lg"
            onClick={onSubmit}
            {...btnProps}
        >
            {hookSignin.isPending ? <Spinner /> : <FormattedMessage id={AuthLanguage.component.button.signin} />}
        </Button>
    );
}
