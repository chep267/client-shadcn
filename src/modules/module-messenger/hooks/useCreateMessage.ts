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
import { BaseLanguage } from '@module-base/constants/language';

/** services */
import { messageService } from '@module-messenger/services/message';

export function useCreateMessage() {
    const { formatMessage } = useIntl();

    return useMutation({
        mutationFn: messageService.create,
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
