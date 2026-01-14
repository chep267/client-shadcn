/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

/** components */
import { Input } from '@module-base/components/input';
import { Field, FieldError, FieldLabel } from '@module-base/components/field';

/** types */
import type { FieldValues } from 'react-hook-form';

export default function FieldEmail<T extends FieldValues>(props: App.ModuleAuth.Component.FormTextFieldProps<T>) {
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
            <Input
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
