/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { MessengerSocketEvent } from '@module-messenger/constants/key';

/** utils */
import { getSocket } from '@module-base/utils/socket';

/** stores */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';
import { useMessageStore } from '@module-messenger/stores/useMessageStore';

export const useSocket = () => {
    const receiveMessage = (message: App.ModuleMessenger.Data.Message) => {
        // add message to store
        const {
            data: { threads },
            action: threadAction,
        } = useThreadStore.getState();
        useMessageStore.getState().action.unshift(message.tid, message);

        // update last message id
        const thread = threads.get(message.tid);
        if (thread) {
            threadAction.add({
                ...thread,
                metadata: {
                    ...thread.metadata,
                    lastMessageId: message.id,
                },
            });
        }
    };

    React.useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.on(MessengerSocketEvent.MESSAGE_CREATED, receiveMessage);

        return () => {
            socket.off(MessengerSocketEvent.MESSAGE_CREATED, receiveMessage);
        };
    }, []);
};
