/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { produce } from 'immer';

/** constants */
import { AppKey } from '@modules/base/constants/env';

/** utils */
import { registerStore } from '@modules/base/utils/store';

const defaultData: Readonly<App.Module.Auth.Store.AuthStore['data']> = {
    user: null,
    prePath: '/',
    token: Cookies.get(AppKey.token) ?? '',
};

export const useAuthStore = create<App.Module.Auth.Store.AuthStore>((set) => {
    registerStore(() => {
        set({ data: structuredClone(defaultData) });
    });

    return {
        data: structuredClone(defaultData),
        action: {
            setData: (updateData = {}) => {
                set(
                    produce<App.Module.Auth.Store.AuthStore>(({ data }) => {
                        Object.assign(data, updateData);
                    })
                );
            },
            refreshToken: () => {
                set(
                    produce<App.Module.Auth.Store.AuthStore>(({ data }) => {
                        data.token = Cookies.get(AppKey.token) ?? '';
                    })
                );
            },
        },
    };
});
