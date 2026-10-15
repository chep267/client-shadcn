/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */

/** components */
import { CardFooter } from '@modules/base/components/card';
import { ButtonSend } from '@modules/messenger/components/Conversation/ConversationFooter/ButtonSend';
import { MessageAction } from '@modules/messenger/components/Conversation/ConversationFooter/MessageAction';
import { MessageEditor } from '@modules/messenger/components/Conversation/ConversationFooter/MessageEditor';
import { MediaPreview } from '@modules/messenger/components/Conversation/ConversationFooter/MediaPreview/MediaPreview';

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
