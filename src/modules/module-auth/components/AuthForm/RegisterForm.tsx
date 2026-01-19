/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import * as z from 'zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** components */
import { Card, CardContent, CardFooter } from '@module-base/components/card';
import { FieldGroup } from '@module-base/components/field';
import AuthTitle from '@module-auth/components/general/AuthTitle';
import AuthBreadcrumbs from '@module-auth/components/general/AuthBreadcrumbs';
import ButtonRegister from '@module-auth/components/general/ButtonRegister';
import FieldEmail from '@module-auth/components/general/FieldEmail';
import FieldPassword from '@module-auth/components/general/FieldPassword';

/** types */
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email' | 'password' | 'confirmPassword';
type TypeFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterForm() {
    const FormFieldsName = React.useMemo<Readonly<{ [Key in TypeFormFieldsName]: Key }>>(
        () => ({
            email: 'email',
            password: 'password',
            confirmPassword: 'confirmPassword',
        }),
        []
    );

    const schema = React.useMemo<z.ZodType<TypeFormData, TypeFormData>>(
        () =>
            z
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
                }),
        []
    );

    const { handleSubmit, control, setError, clearErrors } = useForm<TypeFormData>({
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
        let messageIntl: string;
        switch (true) {
            case isCallApiErrorByClient(error):
                messageIntl = AuthLanguage.notify.register.error;
                break;
            default:
                messageIntl = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message: messageIntl });
        setError(FormFieldsName.password, { message: messageIntl });
        setError(FormFieldsName.confirmPassword, { message: messageIntl });
        delay(AppTimer.notifyDuration).then(() => clearErrors());
    };

    return (
        <Card className={clsx('w-full max-w-xl min-w-0', 'z-1 rounded-md', 'overflow-hidden shadow-lg')}>
            <AuthTitle name="register" />
            <CardContent>
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
            </CardContent>
            <CardFooter
                className={clsx(
                    'w-full justify-between gap-2',
                    'mobile:items-end items-start',
                    'mobile:flex-row flex-col'
                )}
            >
                <AuthBreadcrumbs name="register" />
                <ButtonRegister handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </CardFooter>
        </Card>
    );
}
