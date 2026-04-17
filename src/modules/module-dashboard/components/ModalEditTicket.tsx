/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Trash2Icon } from 'lucide-react';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useRemoveTicket } from '@module-dashboard/hooks/useRemoveTicket';

/** stores */
import { useTicketStore } from '@module-dashboard/stores/useTicketStore';

/** components */
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';

export function ModalEditTicket() {
    const { isPending, mutate: removeTicket } = useRemoveTicket();
    const item = useTicketStore((store) => store.data.itemEdit);
    const action = useTicketStore((store) => store.action);

    const onCancel = () => {
        action.setData({ itemEdit: null });
    };

    const onConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!item) return;
        event.preventDefault();
        event.stopPropagation();
        removeTicket(item.id, {
            onSettled: onCancel,
        });
    };

    return (
        <ModalConfirm
            open={!!item}
            loading={isPending}
            title="Delete Task"
            description={`Are you sure you want to delete this task "${item?.title}"?`}
            confirmText={<FormattedMessage id={BaseLanguage.component.button.delete} defaultMessage="Delete" />}
            variant="destructive"
            media={<Trash2Icon className="text-danger" />}
            onCancel={onCancel}
            onConfirm={onConfirm}
        />
    );
}
