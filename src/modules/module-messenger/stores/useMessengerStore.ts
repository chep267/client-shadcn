/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';

const defaultSettingStore: Readonly<App.ModuleMessenger.Store.TypeMessengerStore['data']> = {
    openInfo: true,
};

export const useMessengerStore = create<App.ModuleMessenger.Store.TypeMessengerStore>((set) => ({
    data: structuredClone(defaultSettingStore),
    action: {
        toggleInfo: () => {
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.openInfo = !store.data.openInfo;
                })
            );
        },
    },
}));
