/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** services */
import { threadService } from '@module-messenger/services/thread';

/** types */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

export function useRemoveThread() {
    const navigate = useNavigate();
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: threadService.remove,
        onSuccess: (_response, { tid }) => {
            useThreadStore.getState().action.remove(tid);
            navigate(MessengerRouterPath.home, { replace: true });
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
