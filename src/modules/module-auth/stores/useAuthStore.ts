/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';

export const useAuthStore = create<App.ModuleAuth.Store.TypeAuthStore>((set) => ({
    data: {
        user: null,
        prePath: '/',
    },
    action: {
        setData: (updateData = {}) => {
            set(
                produce<App.ModuleAuth.Store.TypeAuthStore>(({ data }) => {
                    Object.assign(data, updateData);
                })
            );
        },
    },
}));
