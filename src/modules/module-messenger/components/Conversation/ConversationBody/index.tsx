/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';
import { useMessageStore } from '@module-messenger/stores/useMessageStore';

/** hooks */
import { useGetMessages } from '@module-messenger/hooks/useGetMessages';

/** components */
import { Typography } from '@module-base/components/typography';
import { WavyLoading } from '@module-base/components/animation/wavy-loading';
import { CardContent } from '@module-base/components/card';
import { Message } from '@module-messenger/components/Message';

export function ConversationBody() {
    const { tid = '' } = useParams();
    const isDraft = tid.startsWith('uid.');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lengthRef = React.useRef(0);
    const meId = useAuthStore((store) => store.data.user!.id);

    const { isPending } = useGetMessages(isDraft ? '' : tid);
    const messageIdsStore = useMessageStore((store) => store.data.messageIds.get(tid));
    const messages = useMessageStore((store) => store.data.messages);

    const messageIds = React.useMemo(() => {
        return Array.from(messageIdsStore || []);
    }, [messageIdsStore, messageIdsStore?.size]);

    React.useEffect(() => {
        lengthRef.current = 0;
    }, [tid]);

    React.useEffect(() => {
        if (!messageIds?.length || lengthRef.current > messageIds.length) return;

        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'auto',
        });
        lengthRef.current = messageIds.length;
    }, [messageIds]);

    const itemContent = React.useCallback(
        (id: App.ModuleMessenger.Data.Message['id']) => {
            const message = messages.get(id);
            if (!message) return null;
            return <Message key={id} message={message} isMe={message.uid === meId} />;
        },
        [messages]
    );

    return (
        <CardContent className={cn('relative flex-1 p-0')}>
            <div
                ref={containerRef}
                className={cn('absolute inset-0 flex-1 overflow-y-auto', 'scrollbar-custom scrollbar-thin')}
            >
                {!tid || isDraft || (!isPending && !messageIds?.length) ? (
                    <div className="flex flex-1 items-center justify-center p-10">
                        <Typography className="text-primary text-sm italic">
                            &quot;
                            <FormattedMessage
                                id={MessengerLanguage.component.label.conversation.body.empty}
                                defaultMessage={MessengerLanguage.component.label.conversation.body.empty}
                            />
                            &quot;
                        </Typography>
                    </div>
                ) : null}

                {!!tid && !isDraft && isPending ? <WavyLoading /> : null}

                {messageIds?.toReversed().map(itemContent)}
            </div>
        </CardContent>
    );
}
