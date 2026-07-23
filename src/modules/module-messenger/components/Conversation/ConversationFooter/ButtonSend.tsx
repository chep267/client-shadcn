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
import { useCreateMessage } from '@module-messenger/hooks/useCreateMessage';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonSend() {
    const { tid = '' } = useParams();
    const navigate = useNavigate();

    const { isPending: isPendingCreate, mutate: createThread } = useCreateThread();
    const { isPending: isPendingSend, mutate: sendMessage } = useCreateMessage();
    const messengerAction = useMessengerStore((store) => store.action);

    const meId = useAuthStore((store) => store.data.user!.id);
    const isTyping = useMessengerStore((store) => store.data.drafts.has(tid) || store.data.attachments.has(tid));
    const isDraft = tid.startsWith('uid.');
    const Icon = isTyping ? SendHorizonalIcon : ThumbsUpIcon;

    const onCreateMessage = React.useCallback((message: App.ModuleMessenger.Data.Message, callback?: () => void) => {
        messengerAction.sentMessage({ tid: message.tid });
        sendMessage(
            { data: message },
            {
                onSuccess: callback,
            }
        );
    }, []);

    const onCreateThread = React.useCallback(
        (message: App.ModuleMessenger.Data.Message) => {
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
                        onCreateMessage({ ...message, tid: thread.id }, () => {
                            messengerAction.closeSearch();
                            const path =
                                MessengerRouterPath.home + MessengerRouterPath.conversation.replace(':tid', thread.id);
                            void navigate(path, { replace: true });
                        });
                    },
                }
            );
        },
        [tid]
    );

    const handSendMessage = () => {
        // gen message from cache
        const message = messengerAction.genMessage({ tid, uid: meId });

        if (isDraft) {
            // create thread & send message
            onCreateThread(message);
            return;
        }

        // send message
        onCreateMessage(message);
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
