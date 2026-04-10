/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as z from 'zod';
import Cookie from 'js-cookie';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppRegex } from '@module-base/constants/AppRegex';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { delay } from '@module-base/utils/delay';
import { isCallApiErrorByClient } from '@module-base/utils/axios';

/** components */
import { Card, CardContent, CardFooter } from '@module-base/components/card';
import { FieldGroup } from '@module-base/components/field';
import { AuthTitle } from '@module-auth/components/general/AuthTitle';
import { AuthBreadcrumbs } from '@module-auth/components/general/AuthBreadcrumbs';
import { ButtonRecover } from '@module-auth/components/general/ButtonRecover';
import { FieldEmail } from '@module-auth/components/general/FieldEmail';

/** types */
import type { AxiosError } from 'axios';

const FormFieldsName: { [Key in App.ModuleAuth.Component.TypeFormRecoverFieldsName]: Key } = {
    email: 'email',
};

const schema = z.object({
    [FormFieldsName.email]: z
        .string()
        .nonempty(AuthLanguage.status.email.empty)
        .regex(AppRegex.email, AuthLanguage.status.email.invalid),
});

export function RecoverForm() {
    const { handleSubmit, control, setError, clearErrors } = useForm<App.ModuleAuth.Component.TypeFormRecoverData>({
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
