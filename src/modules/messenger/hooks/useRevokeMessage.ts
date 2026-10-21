/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { BaseLanguage } from '@modules/base/constants';

/** services */
import { messageService } from '@modules/messenger/services/message';

/** types */
import { useMessageStore } from '@modules/messenger/stores/useMessageStore';

export function useRevokeMessage() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messageService.revoke,
        onSuccess: (_response, { tid, mid }) => {
            useMessageStore.getState().action.remove(tid, mid);
        },
        onError: () => {
            toast.error(
                formatMessage({
                    id: BaseLanguage.component.label.error.server,
                    defaultMessage: BaseLanguage.component.label.error.server,
                })
            );
        },
    });
}
