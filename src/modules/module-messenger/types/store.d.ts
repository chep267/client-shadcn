/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Message, Thread } from '@module-messenger/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** messenger store */
interface MessengerStoreData {
    openInfo: boolean;
    openSearch: boolean;
    searchKey: string;
    drafts: Map<string, string>;
    attachments: Map<string, File[]>;
}
interface MessengerStoreAction {
    toggleInfo: () => void;
    toggleSearch: () => void;
    closeSearch: () => void;
    changeSearchKey: (value: string) => void;
    addDraft: (payload: { tid?: Thread['id']; draft?: string }) => void;
    addAttachments: (payload: { tid?: Thread['id']; attachments?: File[] }) => void;
    removeAsset: (payload: { tid?: Thread['id']; pos: number }) => void;
    genMessage: (payload: Pick<Message, 'tid' | 'uid'>) => Message;
    genThread: (payload: Partial<Thread>) => Thread;
    sentMessage: (payload: { tid: Thread['id'] }) => void;
}
export interface MessengerStore {
    data: MessengerStoreData;
    action: MessengerStoreAction;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** thread store */
interface ThreadStoreData {
    threadIds: Set<Thread['id']>;
    threads: Map<Thread['id'], Thread>;
    searches: Map<Thread['id'], Thread>;
}
interface ThreadStoreAction {
    unshift: (thread: Thread) => void;
    add: (thread: Thread) => void;
    multiAdd: (threads: Thread[]) => void;
    remove: (tid: Thread['id']) => void;
    multiSearch: (threads: Thread[]) => void;
    update: (thread: Pick<Thread, 'id'> & Partial<Thread>) => void;
}
export interface ThreadStore {
    data: ThreadStoreData;
    action: ThreadStoreAction;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** message store */
interface MessageStoreData {
    messageIds: Map<Thread['tid'], Set<Message['id']>>;
    messages: Map<Message['id'], Message>;
}
interface MessageStoreAction {
    unshift: (tid: Thread['id'], message: Message) => void;
    add: (tid: Thread['id'], message: Message) => void;
    multiAdd: (tid: Thread['id'], messages: Message[]) => void;
    remove: (tid: Thread['id'], mid: Message['id']) => void;
}
export interface MessageStore {
    data: MessageStoreData;
    action: MessageStoreAction;
}
