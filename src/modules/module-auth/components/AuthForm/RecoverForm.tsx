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
import FieldEmail from '@module-auth/components/general/FieldEmail';
import ButtonRecover from '@module-auth/components/general/ButtonRecover';

/** types */
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email';
type TypeFormData = {
    email: string;
};

export default function RecoverForm() {
    const [FormFieldsName] = React.useState<{ [Key in TypeFormFieldsName]: Key }>({
        email: 'email',
    });

    const [schema] = React.useState<z.ZodType<TypeFormData, TypeFormData>>(() =>
        z.object({
            [FormFieldsName.email]: z
                .string()
                .nonempty(AuthLanguage.status.email.empty)
                .regex(AppRegex.email, AuthLanguage.status.email.invalid),
        })
    );

    const { handleSubmit, control, setError, clearErrors } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = (error: AxiosError) => {
        let messageIntl: string;
        switch (true) {
            case isCallApiErrorByClient(error):
                messageIntl = AuthLanguage.notify.recover.error;
                break;
            default:
                messageIntl = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message: messageIntl });
        delay(AppTimer.notifyDuration).then(() => clearErrors());
    };

    return (
        <Card className={clsx('w-full max-w-xl min-w-0', 'z-1 rounded-md', 'overflow-hidden shadow-lg')}>
            <AuthTitle name="recover" />
            <CardContent>
                <FieldGroup className="gap-4">
                    <FieldEmail
                        name={FormFieldsName.email}
                        control={control}
                        label={AuthLanguage.component.label.email}
                        autoComplete="username"
                        autoFocus
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
                <AuthBreadcrumbs name="recover" />
                <ButtonRecover handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </CardFooter>
        </Card>
    );
}
