/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */

/** components */
import { CardFooter } from '@module-base/components/card';
import { ButtonSend } from '@module-messenger/components/Conversation/ButtonSend';
import { MessageEditor } from '@module-messenger/components/Conversation/MessageEditor';

export function ConversationFooter() {
    return (
        <CardFooter className="items-end gap-2 border-t p-2">
            <MessageEditor />
            <ButtonSend />
        </CardFooter>
    );
}
