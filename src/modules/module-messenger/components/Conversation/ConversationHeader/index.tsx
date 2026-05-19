/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { CardHeader, CardTitle } from '@module-base/components/card';
import { ButtonInfo } from '@module-messenger/components/Conversation/ConversationHeader/ButtonInfo';
import { ThreadCurrent } from '@module-messenger/components/Conversation/ConversationHeader/ThreadCurrent';

export function ConversationHeader() {
    return (
        <CardHeader
            className={cn(
                'gap-0 border-b p-2!',
                'grid-rows-[auto] items-center',
                'h-(--app-size-height-messenger-conversation-header) w-full'
            )}
        >
            <CardTitle className={cn('flex items-center justify-between', 'gap-2 overflow-hidden')}>
                <ThreadCurrent />
                <ButtonInfo />
            </CardTitle>
        </CardHeader>
    );
}
