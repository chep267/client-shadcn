/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { CardHeader, CardTitle } from '@module-base/components/card';
import { ButtonInfo } from '@module-messenger/components/Conversation/ConversationHeader/ButtonInfo';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadList/ThreadItem';

export function ConversationHeader() {
    const { tid = '' } = useParams();

    return (
        <CardHeader
            className={cn(
                'gap-0 border-b p-2!',
                'grid-rows-[auto] items-center',
                'h-(--app-size-height-messenger-conversation-header) w-full'
            )}
        >
            <CardTitle className={cn('flex items-center justify-between', 'gap-2 overflow-hidden')}>
                <ThreadItem
                    className="p-0 hover:bg-inherit"
                    id={tid}
                    hasLink={false}
                    hasOption={false}
                    hasDescription={false}
                />
                <ButtonInfo />
            </CardTitle>
        </CardHeader>
    );
}
