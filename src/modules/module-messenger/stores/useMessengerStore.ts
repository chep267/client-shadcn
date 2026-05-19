/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

enableMapSet();

const defaultSettingStore: Readonly<App.ModuleMessenger.Store.TypeMessengerStore['data']> = {
    openInfo: true,
    openSearch: false,
    searchKey: '',
    drafts: new Map(),
    typings: new Map(),
    assets: new Map(),
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
        toggleSearch: () => {
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.openSearch = !store.data.openSearch;
                    store.data.searchKey = '';
                })
            );
        },
        changeSearchKey: (value = '') => {
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.searchKey = value;
                })
            );
        },
        addDraft: (payload) => {
            const { tid, draft = '' } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.drafts.set(tid, draft);
                })
            );
        },
        addTyping: (payload) => {
            const { tid, typing = false } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.typings.set(tid, typing);
                })
            );
        },
        addAssets: (payload) => {
            const { tid, assets = [] } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.assets.set(tid, assets);
                })
            );
        },
        removeAsset: (payload) => {
            const { tid, pos } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.assets.get(tid)?.splice(pos, 1);
                })
            );
        },
    },
}));
