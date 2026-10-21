/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as z from 'zod';
import Cookies from 'js-cookie';
import { cn } from 'cn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import delay from 'lodash-es/delay';

/** constants */
import { AppKey, AppRegex, AppTimer } from '@modules/base/constants';
import { AuthLanguage } from '@modules/auth/constants';

/** utils */
import { isClientError } from '@modules/base/utils/axiosHelper';

/** components */
import { Card, CardContent, CardFooter } from '@modules/base/components/card';
import { FieldGroup } from '@modules/base/components/field';
import { AuthTitle } from '@modules/auth/components/general/AuthTitle';
import { AuthBreadcrumbs } from '@modules/auth/components/general/AuthBreadcrumbs';
import { ButtonRecover } from '@modules/auth/components/general/ButtonRecover';
import { FieldEmail } from '@modules/auth/components/general/FieldEmail';

/** types */
import type { AxiosError } from 'axios';

const FormFieldsName: { [Key in App.Module.Auth.Component.FormRecoverFieldsName]: Key } = {
    email: 'email',
};

const schema = z.object({
    [FormFieldsName.email]: z
        .string()
        .nonempty(AuthLanguage.status.email.empty)
        .regex(AppRegex.email, AuthLanguage.status.email.invalid),
});

function RecoverForm() {
    const { handleSubmit, control, setError, clearErrors } = useForm<App.Module.Auth.Component.FormRecoverData>({
        defaultValues: {
            [FormFieldsName.email]: Cookies.get(AppKey.email) ?? '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = (error: AxiosError) => {
        let message: string;
        switch (true) {
            case isClientError(error):
                message = AuthLanguage.notify.recover.error;
                break;
            default:
                message = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message });
        delay(clearErrors, AppTimer.notifyDuration);
    };

    return (
        <Card className={cn('w-full max-w-xl min-w-0', 'z-1 rounded-md', 'overflow-hidden shadow-lg')}>
            <AuthTitle mode="recover" />

            <CardContent>
                <form>
                    <FieldGroup className="gap-4">
                        <FieldEmail
                            name={FormFieldsName.email}
                            control={control}
                            label={AuthLanguage.component.label.email}
                            autoComplete="username"
                            autoFocus
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter
                className={cn(
                    'w-full justify-between gap-2',
                    'mobile:items-end items-start',
                    'mobile:flex-row flex-col'
                )}
            >
                <AuthBreadcrumbs mode="recover" />
                <ButtonRecover handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </CardFooter>
        </Card>
    );
}

export { RecoverForm };
export default RecoverForm;
