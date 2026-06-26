/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';
import merge from 'lodash-es/merge';

/** utils */
import { registerStore } from '@module-base/utils/store';

enableMapSet();

const defaultData: Readonly<App.ModuleMessenger.Store.ThreadStore['data']> = {
    threadIds: new Set(),
    threads: new Map(),
    searches: new Map(),
};

export const useThreadStore = create<App.ModuleMessenger.Store.ThreadStore>((set) => {
    registerStore(() => {
        set({ data: structuredClone(defaultData) });
    });

    return {
        data: structuredClone(defaultData),
        action: {
            unshift: (thread) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>(({ data }) => {
                        data.threads.set(thread.id, thread);
                        const ids = data.threadIds || new Set();
                        ids.delete(thread.id);
                        data.threadIds = new Set([thread.id, ...ids]);
                    })
                );
            },
            add: (thread) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>(({ data }) => {
                        data.threads.set(thread.id, thread);
                        const ids = data.threadIds || new Set();
                        ids.add(thread.id);
                        data.threadIds = ids;
                    })
                );
            },
            multiAdd: (threads) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>(({ data }) => {
                        threads.forEach((thread) => {
                            data.threads.set(thread.id, thread);
                            const ids = data.threadIds || new Set();
                            ids.add(thread.id);
                            data.threadIds = ids;
                        });
                    })
                );
            },
            multiSearch: (threads) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>(({ data }) => {
                        threads.forEach((item) => {
                            data.searches.set(item.id, item);
                        });
                    })
                );
            },
            remove: (tid) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>(({ data }) => {
                        data.threadIds.delete(tid);
                        data.threads.delete(tid);
                        data.searches.delete(tid);
                    })
                );
            },
            update: (thread) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>(({ data }) => {
                        if (data.threads.has(thread.id)) {
                            merge(data.threads.get(thread.id), thread);
                        }
                    })
                );
            },
        },
    };
});
