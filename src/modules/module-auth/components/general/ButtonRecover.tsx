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
import { useRecover } from '@module-auth/hooks/useRecover';

/** components */
import { Button } from '@module-base/components/button';
import { Spinner } from '@module-base/components/spinner';

/** types */
import type { AxiosError } from 'axios';
import type { UseFormHandleSubmit } from 'react-hook-form';

type TypeFormData = {
    email: string;
};
interface TypeButtonRecover {
    handleSubmit: UseFormHandleSubmit<TypeFormData>;
    onSubmitError: (error: AxiosError) => void;
}

export default function ButtonRecover(props: TypeButtonRecover) {
    const { handleSubmit, onSubmitError: onError, ...btnProps } = props;

    const hookRecover = useRecover();

    const onSubmit = handleSubmit((data) => {
        hookRecover.mutate(data, { onError });
    });

    return (
        <Button
            type="button"
            variant="outline"
            className={clsx('hover:text-main hover:border-main', 'mobile:w-1/3 w-full', {
                'text-main border-main': hookRecover.isPending,
            })}
            size="lg"
            onClick={onSubmit}
            {...btnProps}
        >
            {hookRecover.isPending ? <Spinner /> : <FormattedMessage id={AuthLanguage.component.button.recover} />}
        </Button>
    );
}
