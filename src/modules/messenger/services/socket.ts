/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** stores */
import { useThreadStore } from '@modules/messenger/stores/useThreadStore';
import { useMessageStore } from '@modules/messenger/stores/useMessageStore';

class SocketService {
    private readonly threadAction: App.Module.Messenger.Store.ThreadStore['action'];
    private readonly messageAction: App.Module.Messenger.Store.MessageStore['action'];

    constructor() {
        this.messageAction = useMessageStore.getState().action;
        this.threadAction = useThreadStore.getState().action;
    }

    public receiveThread = (thread: App.Module.Messenger.Data.Thread) => {
        this.threadAction.unshift(thread);
    };

    public receiveMessage = (message: App.Module.Messenger.Data.Message) => {
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
