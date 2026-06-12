/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

enableMapSet();

export const useUserStore = create<App.ModuleUser.Store.UserStore>((set) => ({
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
                produce<App.ModuleUser.Store.UserStore>((store) => {
                    store.data.list.push(item);
                    store.data.map.set(item.id, item);
                })
            );
        },
        remove: (id) => {
            set(
                produce<App.ModuleUser.Store.UserStore>((store) => {
                    store.data.list = store.data.list.filter((item) => item.id !== id);
                    store.data.map.delete(id);
                })
            );
        },
    },
}));
