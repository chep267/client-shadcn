/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetMessage } from '@module-messenger/hooks/useGetMessage';

/** stores */
import { useUserStore } from '@module-user/stores/useUserStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { Typography } from '@module-base/components/typography';

interface LastMessageTextProps extends React.ComponentProps<typeof Typography> {
    className?: string;
    mid?: string;
}

export function LastMessageText(props: LastMessageTextProps) {
    const { className, mid, ...otherProps } = props;

    const meId = useAuthStore((store) => store.data.user!.id);
    const { isFetching, data } = useGetMessage(mid);
    const { data: message } = data ?? {};

    const senderName = React.useMemo(() => {
        switch (true) {
            case !message?.uid:
                return null;
            case message?.uid === meId:
                return (
                    <FormattedMessage
                        id={MessengerLanguage.component.label.threads.sender}
                        defaultMessage={MessengerLanguage.component.label.threads.sender}
                    />
                );
            default:
                return useUserStore.getState().data.users.get(message.uid)?.name;
        }
    }, [message?.uid]);

    if (isFetching || !mid || !message) {
        return null;
    }

    return (
        <Typography className={cn('text-muted-foreground truncate text-xs', className)} {...otherProps}>
            {senderName}:&nbsp;
            {message.content}
        </Typography>
    );
}
