/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useUpdateTicket } from '@module-dashboard/hooks/useUpdateTicket';

/** stores */
import { useTicketStore } from '@module-dashboard/stores/useTicketStore';

/** components */
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';
import { FormEditTicket } from '@module-dashboard/components/ModalEditTicket/FormEditTicket';

/** types */
import type { UseFormHandleSubmit } from 'react-hook-form';

export function ModalEditTicket() {
    const formRef = React.useRef<{ onSubmit: UseFormHandleSubmit<{ description: string; status: string }> }>(null);
    const { isPending, mutate: updateTicket } = useUpdateTicket();
    const item = useTicketStore((store) => store.data.itemEdit);
    const action = useTicketStore((store) => store.action);

    const onCancel = () => {
        action.setData({ itemEdit: null });
    };

    const onConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!item) return;
        event.preventDefault();
        event.stopPropagation();
        formRef.current?.onSubmit((data) => {
            updateTicket(
                { id: item.id, data },
                {
                    onSettled: onCancel,
                }
            );
        })();
    };

    if (!item) return null;

    return (
        <ModalConfirm
            open
            loading={isPending}
            className="[&>div]:data-[slot='alert-dialog-footer']:mt-5"
            title="Edit Ticket"
            confirmText={<FormattedMessage id={BaseLanguage.component.button.confirm} defaultMessage="confirm" />}
            onCancel={onCancel}
            onConfirm={onConfirm}
        >
            <FormEditTicket ref={formRef} item={item} />
        </ModalConfirm>
    );
}
