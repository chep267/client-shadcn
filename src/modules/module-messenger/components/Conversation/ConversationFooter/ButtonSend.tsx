/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SendHorizonalIcon, ThumbsUpIcon } from 'lucide-react';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** hooks */
import { useCreateThread } from '@module-messenger/hooks/useCreateThread';
import { usePostMessage } from '@module-messenger/hooks/usePostMessage';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonSend() {
    const { tid = '' } = useParams();
    const navigate = useNavigate();

    const { isPending: isPendingCreate, mutate: createThread } = useCreateThread();
    const { isPending: isPendingSend, mutate: sendMessage } = usePostMessage();
    const messengerAction = useMessengerStore((store) => store.action);

    const meId = useAuthStore((store) => store.data.user?.id ?? '');
    const isTyping = useMessengerStore((store) => store.data.drafts.has(tid) || store.data.attachments.has(tid));
    const isDraft = tid.startsWith('uid.');
    const Icon = isTyping ? SendHorizonalIcon : ThumbsUpIcon;

    const onPostMessage = React.useCallback((message: App.ModuleMessenger.Data.TypeMessage) => {
        sendMessage(
            { data: message },
            {
                onSuccess: () => {
                    messengerAction.sentMessage({ tid: message.tid });
                    if (isDraft) {
                        const path =
                            MessengerRouterPath.home + MessengerRouterPath.conversation.replace(':tid', message.tid);
                        messengerAction.closeSearch();
                        navigate(path, { replace: true });
                    }
                },
            }
        );
    }, []);

    const onCreateThread = React.useCallback((message: App.ModuleMessenger.Data.TypeMessage) => {
        createThread(
            {
                data: messengerAction.genThread({
                    uids: [meId, tid], // tid <=> partner id
                }),
            },
            {
                onSuccess: (response) => {
                    const { data: thread } = response;
                    // replace new thread id
                    onPostMessage({ ...message, tid: thread.id });
                },
            }
        );
    }, []);

    const handSendMessage = () => {
        // gen message from cache
        const message = messengerAction.genMessage({ tid, uid: meId });

        if (isDraft) {
            // create thread & send message
            return onCreateThread(message);
        }

        // send message
        return onPostMessage(message);
    };

    return (
        <Button
            variant="ghost"
            className={cn(
                'size-10',
                'cursor-pointer rounded-full text-inherit shadow-none',
                'hover:text-main hover:border hover:bg-transparent'
            )}
            aria-label="message-send"
            disabled={!tid || isPendingCreate || isPendingSend}
            onClick={handSendMessage}
        >
            <Icon className="size-6" />
        </Button>
    );
}
