/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

enableMapSet();

export const useThreadStore = create<App.ModuleMessenger.Store.ThreadStore>((set) => ({
    data: {
        list: [],
        map: new Map(),
        metadata: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            currentItems: 0,
        },
    },
    action: {
        add: (item) => {
            set(
                produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                    if (store.data.map.has(item.id)) return;

                    store.data.list.push(item);
                    const nextMap = new Map(store.data.map);
                    nextMap.set(item.id, item);
                    store.data.map = nextMap;
                })
            );
        },
        remove: (id) => {
            set(
                produce<App.ModuleMessenger.Store.ThreadStore>((store) => {
                    if (!store.data.map.has(id)) return;

                    store.data.list = store.data.list.filter((item) => item.id !== id);
                    const nextMap = new Map(store.data.map);
                    nextMap.delete(id);
                    store.data.map = nextMap;
                })
            );
        },
    },
}));
