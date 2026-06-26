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

const defaultSettingStore: Readonly<App.ModuleMessenger.Store.MessengerStore['data']> = {
    openInfo: true,
    openSearch: false,
    searchKey: '',
    drafts: new Map(),
    attachments: new Map(),
};

export const useMessengerStore = create<App.ModuleMessenger.Store.MessengerStore>((set, get) => ({
    data: structuredClone(defaultSettingStore),
    action: {
        toggleInfo: () => {
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.openInfo = !store.data.openInfo;
                })
            );
        },
        toggleSearch: () => {
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.openSearch = !store.data.openSearch;
                    store.data.searchKey = '';
                })
            );
        },
        closeSearch: () => {
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.openSearch = false;
                    store.data.searchKey = '';
                })
            );
        },
        changeSearchKey: (value = '') => {
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.searchKey = value;
                })
            );
        },
        addDraft: (payload) => {
            const { tid, draft = '' } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.drafts.set(tid, draft);
                })
            );
        },
        addAttachments: (payload) => {
            const { tid, attachments = [] } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.attachments.set(tid, attachments);
                })
            );
        },
        removeAsset: (payload) => {
            const { tid, pos } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.attachments.get(tid)?.splice(pos, 1);
                })
            );
        },
        genMessage: (payload) => {
            const { tid, uid } = payload;
            const { drafts, attachments } = get().data;
            const content = (drafts.get(tid) ?? '').trim();
            const files = attachments.get(tid) ?? [];

            return {
                id: '',
                uid,
                tid,
                type: content ? 'text' : 'sticker',
                attachments: files.map(mapFileToAttachment) as App.ModuleMessenger.Data.Attachment[],
                content,
                status: 'sending',
                metadata: {
                    replyTo: '',
                    isPinned: false,
                    isDeleted: false,
                    isRevoked: false,
                },
                createdAt: '',
                updatedAt: '',
            };
        },
        genThread: (payload) => {
            return {
                id: '',
                name: payload.name ?? '',
                avatar: payload.avatar ?? '',
                uids: payload.uids ?? [],
                unreads: payload.uids?.map((uid) => ({ uid, count: 0 })) || [],
                metadata: {
                    lastMessageId: payload.metadata?.lastMessageId ?? '',
                    isGroup: payload.metadata?.isGroup ?? false,
                    isMuted: payload.metadata?.isMuted ?? false,
                    isPinned: payload.metadata?.isPinned ?? false,
                },
                createdAt: '',
                updatedAt: '',
            };
        },
        sentMessage: (payload) => {
            const { tid } = payload;
            if (!tid) return;
            set(
                produce<App.ModuleMessenger.Store.MessengerStore>((store) => {
                    store.data.drafts.delete(tid);
                    store.data.attachments.delete(tid);
                })
            );
        },
    },
}));
