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

/** hooks */
import { useGetMessages } from '@module-messenger/hooks/useGetMessages';

/** components */
import { CardContent } from '@module-base/components/card';
import { WavyLoading } from '@module-base/components/animation/wavy-loading';
import { Message } from '@module-messenger/components/Message';

export function ConversationBody() {
    const { id } = useParams();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isFirstLoadRef = React.useRef(true);

    const { isPending, data } = useGetMessages(id);
    const { data: messages } = data ?? {};

    React.useEffect(() => {
        isFirstLoadRef.current = true;
    }, [id]);

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
                {isPending ? <WavyLoading /> : messages?.map((message) => <Message message={message} />)}
            </div>
        </CardContent>
    );
}
