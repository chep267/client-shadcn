/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

/** components */
import { Field, FieldError, FieldLabel } from '@module-base/components/field';
import { SelectTicketStatus } from '@module-dashboard/components/SelectTicketStatus';

/** types */
import type { FieldValues } from 'react-hook-form';

export function FieldSelectTicketStatus<T extends FieldValues>(props: App.ModuleAuth.Component.FormTextFieldProps<T>) {
    const { name, control, label } = props;
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

            <SelectTicketStatus
                className="h-10"
                placeholder="Filter by status"
                disabled={field.disabled}
                value={field.value}
                onChange={field.onChange}
            />
            <FieldError>
                {hasError && <FormattedMessage id={error.message} defaultMessage={error.message} />}
            </FieldError>
        </Field>
    );
}
