/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { BaseLanguage } from '@modules/base/constants';
import { MessengerRouterPath } from '@modules/messenger/constants';

/** services */
import { threadService } from '@modules/messenger/services/thread';

/** types */
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';

export function useRemoveThread() {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: threadService.remove,
        onSuccess: (_response, { tid }) => {
            useThreadStore.getState().action.remove(tid);
            void navigate(MessengerRouterPath.home, { replace: true });
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
