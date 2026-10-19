/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

/** utils */
import { registerStore } from '@modules/base/utils/store';

enableMapSet();

const defaultData: Readonly<App.Module.User.Store.UserStore['data']> = {
    users: new Map(),
    metadata: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        currentItems: 0,
    },
};

export const useUserStore = create<App.Module.User.Store.UserStore>((set) => {
    registerStore(() => {
        set({ data: structuredClone(defaultData) });
    });

    return {
        data: structuredClone(defaultData),
        action: {
            add: (user) => {
                set(
                    produce<App.Module.User.Store.UserStore>((store) => {
                        store.data.users.set(user.id, user);
                    })
                );
            },
            multiAdd: (users) => {
                set(
                    produce<App.Module.User.Store.UserStore>((store) => {
                        users.forEach((user) => {
                            store.data.users.set(user.id, user);
                        });
                    })
                );
            },
            remove: (uid) => {
                set(
                    produce<App.Module.User.Store.UserStore>((store) => {
                        store.data.users.delete(uid);
                    })
                );
            },
        },
    };
});
