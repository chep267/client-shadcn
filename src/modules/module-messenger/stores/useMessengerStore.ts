/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';

/** utils */
import { mapFileToAttachment } from '@module-messenger/utils/messages';

enableMapSet();

const defaultSettingStore: Readonly<App.ModuleMessenger.Store.TypeMessengerStore['data']> = {
    openInfo: true,
    openSearch: false,
    searchKey: '',
    drafts: new Map(),
    typings: new Map(),
    attachments: new Map(),
};

export const useMessengerStore = create<App.ModuleMessenger.Store.TypeMessengerStore>((set, get) => ({
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
        closeSearch: () => {
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.openSearch = false;
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
        addAttachments: (payload) => {
            const { tid, attachments = [] } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.attachments.set(tid, attachments);
                })
            );
        },
        removeAsset: (payload) => {
            const { tid, pos } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.attachments.get(tid)?.splice(pos, 1);
                })
            );
        },
        genMessage: (payload) => {
            const { tid, uid } = payload;
            const { drafts, attachments } = get().data;
            const content = drafts.get(tid) ?? '';
            const files = attachments.get(tid) ?? [];

            return {
                tid,
                uid,
                mid: '',
                type: 'text',
                attachments: files.map(mapFileToAttachment),
                content: content.trim(),
                status: 'sending',
                createdAt: new Date().toISOString(),
            };
        },
        genThread: (payload) => {
            return {
                tid: payload.tid ?? '',
                name: payload.name ?? '',
                avatar: payload.avatar ?? '',
                isGroup: payload.isGroup ?? false,
                uids: payload.uids ?? [],
                updatedAt: new Date().toISOString(),
                lastMessage: undefined,
                unreadCounts: [],
            };
        },
        sentMessage: (payload) => {
            const { tid } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.TypeMessengerStore>((store) => {
                    store.data.drafts.delete(tid);
                })
            );
        },
    },
}));
