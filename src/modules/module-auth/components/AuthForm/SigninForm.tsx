/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import * as z from 'zod';
import Cookie from 'js-cookie';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
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
import ButtonSignin from '@module-auth/components/general/ButtonSignin';
import FieldEmail from '@module-auth/components/general/FieldEmail';
import FieldPassword from '@module-auth/components/general/FieldPassword';

/** types */
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    email: string;
    password: string;
};

export default function SigninForm() {
    const FormFieldsName = React.useMemo<Readonly<{ [Key in TypeFormFieldsName]: Key }>>(
        () => ({
            email: 'email',
            password: 'password',
        }),
        []
    );

    const schema = React.useMemo<z.ZodType<TypeFormData, TypeFormData>>(
        () =>
            z.object({
                [FormFieldsName.email]: z
                    .string()
                    .nonempty(AuthLanguage.status.email.empty)
                    .regex(AppRegex.email, AuthLanguage.status.email.invalid),
                [FormFieldsName.password]: z
                    .string()
                    .nonempty(AuthLanguage.status.password.empty)
                    .regex(AppRegex.password, AuthLanguage.status.password.invalid),
            }),
        []
    );

    const { handleSubmit, control, setError, clearErrors } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
            [FormFieldsName.password]: 'Midom@2024',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = (error: AxiosError) => {
        let messageIntl: string;
        switch (true) {
            case isCallApiErrorByClient(error):
                messageIntl = AuthLanguage.notify.signin.error;
                break;
            default:
                messageIntl = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message: messageIntl });
        setError(FormFieldsName.password, { message: messageIntl });
        delay(AppTimer.notifyDuration, clearErrors).then();
    };

    return (
        <Card className={clsx('w-full max-w-xl min-w-0', 'z-1 rounded-md', 'overflow-hidden shadow-lg')}>
            <AuthTitle name="signin" />
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
                        autoComplete="current-password"
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
                <AuthBreadcrumbs name="signin" />
                <ButtonSignin handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </CardFooter>
        </Card>
    );
}
