/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

/** utils */
import { registerStore } from '@module-base/utils/store';

enableMapSet();

const defaultData: Readonly<App.ModuleMessenger.Store.MessageStore['data']> = {
    messageIds: new Map(),
    messages: new Map(),
};

export const useMessageStore = create<App.ModuleMessenger.Store.MessageStore>((set) => {
    registerStore(() => {
        set({ data: structuredClone(defaultData) });
    });

    return {
        data: structuredClone(defaultData),
        action: {
            unshift: (tid, message) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>((store) => {
                        store.data.messages.delete(message.id);
                        store.data.messages = new Map([[message.id, message], ...store.data.messages]);

                        if (store.data.messageIds.has(tid)) {
                            const itemIds = store.data.messageIds.get(tid)!;
                            itemIds.unshift(message.id);
                        } else {
                            store.data.messageIds.set(tid, [message.id]);
                        }
                    })
                );
            },
            add: (tid, message) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>((store) => {
                        store.data.messages.set(message.id, message);

                        if (store.data.messageIds.has(tid)) {
                            const itemIds = store.data.messageIds.get(tid)!;
                            itemIds.push(message.id);
                        } else {
                            store.data.messageIds.set(tid, [message.id]);
                        }
                    })
                );
            },
            multiAdd: (tid, messages) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>((store) => {
                        messages.forEach((message) => {
                            store.data.messages.set(message.id, message);

                            if (store.data.messageIds.has(tid)) {
                                const itemIds = store.data.messageIds.get(tid)!;
                                itemIds.push(message.id);
                            } else {
                                store.data.messageIds.set(tid, [message.id]);
                            }
                        });
                    })
                );
            },
            remove: (id) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>((store) => {
                        store.data.messages.delete(id);
                    })
                );
            },
        },
    };
});
