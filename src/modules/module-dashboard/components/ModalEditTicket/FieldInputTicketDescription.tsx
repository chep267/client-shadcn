/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { type Control, type FieldPath, useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

/** components */
import { Textarea } from '@module-base/components/textarea';
import { Field, FieldError, FieldLabel } from '@module-base/components/field';

/** types */
import type { FieldValues } from 'react-hook-form';
import type { ComponentProps } from 'react';

export interface FieldInputTicketDescriptionProps<
    T extends FieldValues = FieldValues,
> extends ComponentProps<'textarea'> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
}

export function FieldInputTicketDescription<T extends FieldValues>(props: FieldInputTicketDescriptionProps<T>) {
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
            <Textarea
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
