/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SendHorizonalIcon, ThumbsUpIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { mapTidToUid } from '@module-messenger/utils/threads';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** hooks */
import { useCreateThread } from '@module-messenger/hooks/useCreateThread';
import { usePostMessage } from '@module-messenger/hooks/usePostMessage';

/** components */
import { Button } from '@module-base/components/button';
import { MessengerRouterPath } from '@module-messenger/constants/path.ts';

export function ButtonSend() {
    const { tid = '' } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isDraft = searchParams.get('draft') === 'true';
    const { isPending: isPendingCreate, mutate: createThread } = useCreateThread();
    const { isPending: isPendingSend, mutate: sendMessage } = usePostMessage();
    const meId = useAuthStore((store) => store.data.user?.uid ?? '');
    const isTyping = useMessengerStore((store) => {
        return store.data.typings.get(tid) || store.data.drafts.get(tid) || store.data.attachments.get(tid);
    });

    const messengerAction = useMessengerStore((store) => store.action);

    const Icon = isTyping ? SendHorizonalIcon : ThumbsUpIcon;

    const handSendMessage = () => {
        // gen message from cache
        const message = messengerAction.genMessage({ tid, uid: meId });

        const onSend = (threadId: string) => {
            // replace threadId
            sendMessage(
                { data: { ...message, tid: threadId } },
                {
                    onSuccess: () => {
                        messengerAction.sentMessage({ tid: threadId });
                        if (isDraft) {
                            const path =
                                MessengerRouterPath.home + MessengerRouterPath.conversation.replace(':tid', threadId);
                            messengerAction.closeSearch();
                            navigate(path, { replace: true });
                        }
                    },
                }
            );
        };

        if (!isDraft) {
            // send message
            return onSend(tid);
        }

        // create thread & send message
        const partnerId = mapTidToUid(tid);
        createThread(
            {
                data: messengerAction.genThread({
                    uids: [meId, partnerId],
                }),
            },
            {
                onSuccess: (response) => {
                    const { data: thread } = response;
                    onSend(thread.tid);
                },
            }
        );
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
            disabled={isPendingCreate || isPendingSend}
            onClick={handSendMessage}
        >
            <Icon className="size-6" />
        </Button>
    );
}
