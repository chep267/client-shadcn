/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookie from 'js-cookie';
import { create } from 'zustand';
import { produce } from 'immer';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

export const useAuthStore = create<App.ModuleAuth.Store.TypeAuthStore>((set) => ({
    data: {
        user: null,
        prePath: '/',
        token: Cookie.get(AppKey.token) || '',
    },
    action: {
        setData: (updateData = {}) => {
            set(
                produce<App.ModuleAuth.Store.TypeAuthStore>(({ data }) => {
                    Object.assign(data, updateData);
                })
            );
        },
        refreshToken: () => {
            set(
                produce<App.ModuleAuth.Store.TypeAuthStore>(({ data }) => {
                    data.token = Cookie.get(AppKey.token) || '';
                })
            );
        },
    },
}));
