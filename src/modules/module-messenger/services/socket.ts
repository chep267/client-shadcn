/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** stores */
import { useThreadStore } from '@module-messenger/stores/useThreadStore';
import { useMessageStore } from '@module-messenger/stores/useMessageStore';

class SocketService {
    private readonly threadAction: App.ModuleMessenger.Store.ThreadStore['action'];
    private readonly messageAction: App.ModuleMessenger.Store.MessageStore['action'];

    constructor() {
        this.messageAction = useMessageStore.getState().action;
        this.threadAction = useThreadStore.getState().action;
    }

    public receiveThread = (thread: App.ModuleMessenger.Data.Thread) => {
        this.threadAction.unshift(thread);
    };

    public receiveMessage = (message: App.ModuleMessenger.Data.Message) => {
        this.messageAction.unshift(message.tid, message);
        this.threadAction.update({
            id: message.tid,
            metadata: {
                lastMessageId: message.id,
            },
        });
    };
}

export const socketService = new SocketService();
