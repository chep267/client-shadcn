/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import { FieldGroup, FieldLabel } from '@module-base/components/field';
import { FieldSelectTicketStatus } from '@module-dashboard/components/ModalEditTicket/FieldSelectTicketStatus';
import { FieldInputTicketDescription } from '@module-dashboard/components/ModalEditTicket/FieldInputTicketDescription';

/** types */
import type { UseFormHandleSubmit } from 'react-hook-form';

type TypeTicketData = App.ModuleDashboard.Data.TypeTicketData;

interface FormEditTicketProps {
    ref?: React.Ref<{
        onSubmit: UseFormHandleSubmit<{ description: TypeTicketData['description']; status: TypeTicketData['status'] }>;
    }>;
    item: TypeTicketData;
}

const FormFieldsName = {
    description: 'description',
    status: 'status',
} as const;

const schema = z.object({
    [FormFieldsName.description]: z.string().nonempty(AuthLanguage.status.email.empty),
    [FormFieldsName.status]: z.string().nonempty(AuthLanguage.status.email.empty),
});

export function FormEditTicket(props: FormEditTicketProps) {
    const { ref, item } = props;

    const { handleSubmit, control } = useForm<{ description: string; status: string }>({
        defaultValues: {
            [FormFieldsName.description]: item.description,
            [FormFieldsName.status]: item.status,
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    React.useImperativeHandle(ref, () => {
        return {
            onSubmit: handleSubmit,
        };
    }, [handleSubmit]);

    return (
        <form>
            <FieldGroup className="gap-4">
                <FieldLabel>Ticket ID: 1</FieldLabel>

                <FieldInputTicketDescription name={FormFieldsName.description} control={control} label="Description" />

                <FieldSelectTicketStatus name={FormFieldsName.status} control={control} label="Status" />
            </FieldGroup>
        </form>
    );
}
