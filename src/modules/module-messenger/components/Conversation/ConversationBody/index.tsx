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
import { delay } from '@module-base/utils/delay';

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
    const isFirstLoadRef = React.useRef(true);
    const meId = useAuthStore((store) => store.data.user!.id);

    const { isPending } = useGetMessages(isDraft ? '' : tid);
    const messageIds = useMessageStore((store) => store.data.messageIds.get(tid));
    const messages = useMessageStore((store) => store.data.messages);

    React.useEffect(() => {
        isFirstLoadRef.current = true;
    }, [tid]);

    React.useEffect(() => {
        delay(100).then(() => {
            containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: isFirstLoadRef.current ? 'auto' : 'smooth',
            });
        });
        isFirstLoadRef.current = false;
    }, [messageIds]);

    return (
        <CardContent className={cn('relative flex-1')}>
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

                {messageIds?.toReversed().map((mid) => {
                    const message = messages.get(mid);
                    if (!message) return null;
                    return <Message key={mid} message={message} isMe={message.uid === meId} />;
                })}
            </div>
        </CardContent>
    );
}
