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
    const { tid } = useParams();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isFirstLoadRef = React.useRef(true);

    const {
        isPending,
        data: { items },
    } = useGetMessages(tid);

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
    }, [items]);

    return (
        <CardContent className={cn('relative flex-1')}>
            <div
                ref={containerRef}
                className={cn('absolute inset-0 flex-1 overflow-y-auto', 'scrollbar-custom scrollbar-thin')}
            >
                {isPending ? <WavyLoading /> : items.map((message) => <Message message={message} />)}
            </div>
        </CardContent>
    );
}
