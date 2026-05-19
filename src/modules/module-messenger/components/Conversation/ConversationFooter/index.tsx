/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */

/** components */
import { CardFooter } from '@module-base/components/card';
import { ButtonSend } from '@module-messenger/components/Conversation/ConversationFooter/ButtonSend';
import { MessageAction } from '@module-messenger/components/Conversation/ConversationFooter/MessageAction';
import { MessageEditor } from '@module-messenger/components/Conversation/ConversationFooter/MessageEditor';
import { MediaPreview } from '@module-messenger/components/Conversation/ConversationFooter/MediaPreview';

export function ConversationFooter() {
    return (
        <CardFooter className="w-full flex-col border-t p-0!">
            <MediaPreview />
            <div className="flex w-full items-end gap-2 p-2">
                <MessageAction />
                <MessageEditor />
                <ButtonSend />
            </div>
        </CardFooter>
    );
}
