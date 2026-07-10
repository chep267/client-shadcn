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
import { AppKey } from '@module-base/constants/env';

/** utils */
import { registerStore } from '@module-base/utils/store';

const defaultData: Readonly<App.ModuleAuth.Store.AuthStore['data']> = {
    user: null,
    prePath: '/',
    token: Cookies.get(AppKey.token) ?? '',
};

export const useAuthStore = create<App.ModuleAuth.Store.AuthStore>((set) => {
    registerStore(() => {
        set({ data: structuredClone(defaultData) });
    });

    return {
        data: structuredClone(defaultData),
        action: {
            setData: (updateData = {}) => {
                set(
                    produce<App.ModuleAuth.Store.AuthStore>(({ data }) => {
                        Object.assign(data, updateData);
                    })
                );
            },
            refreshToken: () => {
                set(
                    produce<App.ModuleAuth.Store.AuthStore>(({ data }) => {
                        data.token = Cookies.get(AppKey.token) ?? '';
                    })
                );
            },
        },
    };
});
