/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Card } from '@module-base/components/card';
import { ConversationHeader } from '@module-messenger/components/Conversation/ConversationHeader';
import { ConversationBody } from '@module-messenger/components/Conversation/ConversationBody';
import { ConversationFooter } from '@module-messenger/components/Conversation/ConversationFooter';

export function Conversation() {
    return (
        <Card
            data-slot="messenger-center"
            className={cn('flex-1', 'ml-1 gap-0 rounded-sm border-l p-0', 'overflow-hidden')}
        >
            <ConversationHeader />
            <ConversationBody />
            <ConversationFooter />
        </Card>
    );
}
