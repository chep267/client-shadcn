/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as z from 'zod';
import { cn } from 'cn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import delay from 'lodash-es/delay';

/** constants */
import { AppRegex } from '@modules/base/constants/regex';
import { AppTimer } from '@modules/base/constants/config';
import { AuthLanguage } from '@modules/auth/constants/language';

/** utils */
import { isClientError } from '@modules/base/utils/axiosHelper';

/** components */
import { Card, CardContent, CardFooter } from '@modules/base/components/card';
import { FieldGroup } from '@modules/base/components/field';
import { AuthTitle } from '@modules/auth/components/general/AuthTitle';
import { AuthBreadcrumbs } from '@modules/auth/components/general/AuthBreadcrumbs';
import { ButtonRegister } from '@modules/auth/components/general/ButtonRegister';
import { FieldEmail } from '@modules/auth/components/general/FieldEmail';
import { FieldPassword } from '@modules/auth/components/general/FieldPassword';

/** types */
import type { AxiosError } from 'axios';

const FormFieldsName: { [Key in App.Module.Auth.Component.FormRegisterFieldsName]: Key } = {
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
};

const schema = z
    .object({
        [FormFieldsName.email]: z
            .string()
            .nonempty(AuthLanguage.status.email.empty)
            .regex(AppRegex.email, AuthLanguage.status.email.invalid),
        [FormFieldsName.password]: z
            .string()
            .nonempty(AuthLanguage.status.password.empty)
            .regex(AppRegex.password, AuthLanguage.status.password.invalid),
        [FormFieldsName.confirmPassword]: z
            .string()
            .nonempty(AuthLanguage.status.password.empty)
            .regex(AppRegex.password, AuthLanguage.status.password.invalid),
    })
    .refine((data) => data[FormFieldsName.password] === data[FormFieldsName.confirmPassword], {
        path: [FormFieldsName.confirmPassword],
        message: AuthLanguage.status.password.different,
    });

function RegisterForm() {
    const { handleSubmit, control, setError, clearErrors } = useForm<App.Module.Auth.Component.FormRegisterData>({
        defaultValues: {
            [FormFieldsName.email]: '',
            [FormFieldsName.password]: '',
            [FormFieldsName.confirmPassword]: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = (error: AxiosError) => {
        let message: string;
        switch (true) {
            case isClientError(error):
                message = AuthLanguage.notify.register.error;
                break;
            default:
                message = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message });
        setError(FormFieldsName.password, { message });
        setError(FormFieldsName.confirmPassword, { message });
        delay(clearErrors, AppTimer.notifyDuration);
    };

    return (
        <Card className={cn('w-full max-w-xl min-w-0', 'z-1 rounded-md', 'overflow-hidden shadow-lg')}>
            <AuthTitle mode="register" />

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
                        <FieldPassword
                            name={FormFieldsName.password}
                            control={control}
                            label={AuthLanguage.component.label.password}
                            autoComplete="new-password"
                        />
                        <FieldPassword
                            name={FormFieldsName.confirmPassword}
                            control={control}
                            label={AuthLanguage.component.label.confirmPassword}
                            autoComplete="new-password"
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
                <AuthBreadcrumbs mode="register" />
                <ButtonRegister handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </CardFooter>
        </Card>
    );
}

export { RegisterForm };
export default RegisterForm;
