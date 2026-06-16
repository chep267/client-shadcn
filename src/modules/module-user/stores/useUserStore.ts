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

const defaultData: Readonly<App.ModuleUser.Store.UserStore['data']> = {
    users: new Map(),
    metadata: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        currentItems: 0,
    },
};

export const useUserStore = create<App.ModuleUser.Store.UserStore>((set) => {
    registerStore(() => {
        set({ data: structuredClone(defaultData) });
    });

    return {
        data: structuredClone(defaultData),
        action: {
            add: (user) => {
                set(
                    produce<App.ModuleUser.Store.UserStore>((store) => {
                        store.data.users.set(user.id, user);
                    })
                );
            },
            multiAdd: (users) => {
                set(
                    produce<App.ModuleUser.Store.UserStore>((store) => {
                        users.forEach((user) => {
                            store.data.users.set(user.id, user);
                        });
                    })
                );
            },
            remove: (uid) => {
                set(
                    produce<App.ModuleUser.Store.UserStore>((store) => {
                        store.data.users.delete(uid);
                    })
                );
            },
        },
    };
});
