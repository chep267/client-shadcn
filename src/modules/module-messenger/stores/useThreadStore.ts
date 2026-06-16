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

const defaultData: Readonly<App.ModuleMessenger.Store.ThreadStore['data']> = {
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
            unshift: (item) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                        store.data.threads.delete(item.id);
                        store.data.threads = new Map([[item.id, item], ...store.data.threads]);
                    })
                );
            },
            add: (item) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                        store.data.threads.set(item.id, item);
                    })
                );
            },
            multiAdd: (threads) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                        threads.forEach((item) => {
                            store.data.threads.set(item.id, item);
                        });
                    })
                );
            },
            multiSearch: (threads) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                        threads.forEach((item) => {
                            store.data.searches.delete(item.id);
                            store.data.searches.set(item.id, item);
                        });
                    })
                );
            },
            remove: (id) => {
                set(
                    produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                        store.data.threads.delete(id);
                        store.data.searches.delete(id);
                    })
                );
            },
        },
    };
});
