/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { toast } from 'sonner';

/** services */
import { messageService } from '@module-messenger/services/message';

/** stores */
import { useMessageStore } from '@module-messenger/stores/useMessageStore';
import { useThreadStore } from '@module-messenger/stores/useThreadStore';

/** types */
import type { AxiosError } from 'axios';

export function useCreateMessage() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messageService.create,
        onSuccess: (response) => {
            const { data: message } = response;
            const {
                data: { threads },
                action: threadAction,
            } = useThreadStore.getState();
            useMessageStore.getState().action.unshift(message.tid, message);

            const thread = threads.get(message.tid);
            if (thread) {
                threadAction.add({
                    ...thread,
                    metadata: {
                        ...thread.metadata,
                        lastMessageId: message.id,
                    },
                });
            }
        },
        onError: (_error: AxiosError) => {
            toast.error(formatMessage({ id: 'error', defaultMessage: 'Có lỗi xảy ra' }));
        },
    });
}
