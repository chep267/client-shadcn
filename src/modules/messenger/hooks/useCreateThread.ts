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
import { AuthLanguage } from '@modules/auth/constants';

/** services */
import { threadService } from '@modules/messenger/services/thread';

export function useCreateThread() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: threadService.create,
        onError: () => {
            toast.error(
                formatMessage({
                    id: AuthLanguage.notify.server.error,
                    defaultMessage: AuthLanguage.notify.server.error,
                })
            );
        },
    });
}
