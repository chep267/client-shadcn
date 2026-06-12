/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { delay } from '@module-base/utils/delay';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** hooks */
import { useGetMessages } from '@module-messenger/hooks/useGetMessages';

/** components */
import { WavyLoading } from '@module-base/components/animation/wavy-loading';
import { CardContent } from '@module-base/components/card';
import { Message } from '@module-messenger/components/Message';

export function ConversationBody() {
    const { tid = '' } = useParams();
    const isDraft = tid.startsWith('uid.');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isFirstLoadRef = React.useRef(true);
    const meId = useAuthStore((store) => store.data.user?.id ?? '');

    const { isFetching, data } = useGetMessages(isDraft ? '' : tid);
    const { data: messages } = data ?? {};

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
    }, [messages]);

    return (
        <CardContent className={cn('relative flex-1')}>
            <div
                ref={containerRef}
                className={cn('absolute inset-0 flex-1 overflow-y-auto', 'scrollbar-custom scrollbar-thin')}
            >
                {isFetching && <WavyLoading />}
                {!isFetching && !messages?.length ? (
                    <div className="flex flex-1 items-center justify-center p-10">
                        <span className="text-primary text-sm italic">"Bắt đầu đoạn hội thoại của bạn"</span>
                    </div>
                ) : null}
                {messages?.map((message) => (
                    <Message key={message.id} message={message} isMe={message.uid === meId} />
                ))}
            </div>
        </CardContent>
    );
}
