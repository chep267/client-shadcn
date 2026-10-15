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
import { AppKey } from '@modules/base/constants/env';
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
import { ButtonSignin } from '@modules/auth/components/general/ButtonSignin';
import { FieldEmail } from '@modules/auth/components/general/FieldEmail';
import { FieldPassword } from '@modules/auth/components/general/FieldPassword';

/** types */
import type { AxiosError } from 'axios';

const FormFieldsName: App.ModuleBase.Data.Constant<App.ModuleAuth.Component.FormSigninFieldsName> = {
    email: 'email',
    password: 'password',
};

const schema = z.object({
    [FormFieldsName.email]: z
        .string()
        .nonempty(AuthLanguage.status.email.empty)
        .regex(AppRegex.email, AuthLanguage.status.email.invalid),
    [FormFieldsName.password]: z
        .string()
        .nonempty(AuthLanguage.status.password.empty)
        .regex(AppRegex.password, AuthLanguage.status.password.invalid),
});

function SigninForm() {
    const { handleSubmit, control, setError, clearErrors } = useForm<App.ModuleAuth.Component.FormSigninData>({
        defaultValues: {
            [FormFieldsName.email]: Cookies.get(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
            [FormFieldsName.password]: 'Midom@2024',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = (error: AxiosError) => {
        let message: string;
        switch (true) {
            case isClientError(error):
                message = AuthLanguage.notify.signin.error;
                break;
            default:
                message = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message });
        setError(FormFieldsName.password, { message });
        delay(clearErrors, AppTimer.notifyDuration);
    };

    return (
        <Card className={cn('w-full max-w-xl min-w-0', 'z-1 rounded-md', 'overflow-hidden shadow-lg')}>
            <AuthTitle mode="signin" />

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
                            autoComplete="current-password"
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
                <AuthBreadcrumbs mode="signin" />
                <ButtonSignin handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </CardFooter>
        </Card>
    );
}

export { SigninForm };
export default SigninForm;
