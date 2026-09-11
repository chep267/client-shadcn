/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { useParams } from 'react-router';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { ButtonPlus } from '@module-messenger/components/Conversation/ConversationFooter/ButtonPlus';
import { ButtonMedia } from '@module-messenger/components/Conversation/ConversationFooter/ButtonMedia';
import { ButtonSticker } from '@module-messenger/components/Conversation/ConversationFooter/ButtonSticker';

export function MessageAction() {
    const { tid = '' } = useParams();

    const isTyping = useMessengerStore((store) =>
        Boolean(store.data.drafts.get(tid) || store.data.attachments.get(tid))
    );

    return (
        <div
            className={cn('flex w-30 overflow-hidden', 'transition-[width] duration-200 ease-linear', {
                'w-10 min-w-10': isTyping,
                'min-w-30': !isTyping,
            })}
        >
            <ButtonPlus />
            <ButtonMedia />
            <ButtonSticker />
        </div>
    );
}
