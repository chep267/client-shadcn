/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { EyeIcon, EyeClosed } from 'lucide-react';

/** components */
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@module-base/components/input-group';
import { Field, FieldError, FieldLabel } from '@module-base/components/field';

/** types */
import type { FieldValues } from 'react-hook-form';

function InputPassword(props: React.ComponentProps<typeof InputGroupInput>) {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = React.useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const Icon = showPassword ? EyeIcon : EyeClosed;

    return (
        <InputGroup>
            <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
            <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="show-hide" onClick={toggleShowPassword}>
                    <Icon />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}

export default function FieldPassword<T extends FieldValues>(props: App.ModuleAuth.Component.FormTextFieldProps<T>) {
    const { name, control, label, ...fieldProps } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    const hasError = !!error?.message;

    return (
        <Field data-invalid={hasError}>
            <FieldLabel htmlFor={name}>
                <FormattedMessage id={label} defaultMessage={label} />
            </FieldLabel>
            <InputPassword
                id={name}
                className="h-10"
                autoComplete="off"
                placeholder="Aa..."
                spellCheck={false}
                aria-invalid={hasError}
                {...fieldProps}
                ref={(elem) => field.ref(elem)}
                name={field.name}
                value={field.value}
                disabled={field.disabled}
                onChange={field.onChange}
                onBlur={field.onBlur}
            />
            <FieldError>
                {hasError && <FormattedMessage id={error.message} defaultMessage={error.message} />}
            </FieldError>
        </Field>
    );
}
