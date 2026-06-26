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
                    produce<App.ModuleMessenger.Store.MessageStore>(({ data }) => {
                        data.messages.set(message.id, message);
                        const ids = data.messageIds.get(tid) || new Set();
                        ids.delete(message.id);
                        data.messageIds.set(tid, new Set([message.id, ...ids]));
                    })
                );
            },
            add: (tid, message) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>(({ data }) => {
                        data.messages.set(message.id, message);
                        const ids = data.messageIds.get(tid) || new Set();
                        ids.add(message.id);
                        data.messageIds.set(tid, ids);
                    })
                );
            },
            multiAdd: (tid, messages) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>(({ data }) => {
                        messages.forEach((message) => {
                            data.messages.set(message.id, message);
                            const ids = data.messageIds.get(tid) || new Set();
                            ids.add(message.id);
                            data.messageIds.set(tid, ids);
                        });
                    })
                );
            },
            remove: (tid, mid) => {
                set(
                    produce<App.ModuleMessenger.Store.MessageStore>(({ data }) => {
                        data.messages.delete(mid);
                        data.messageIds.get(tid)?.delete(mid);
                    })
                );
            },
        },
    };
});
