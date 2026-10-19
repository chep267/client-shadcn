/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';

const defaultData: Readonly<App.Module.Base.Store.ModalStore['data']> = {
    open: false,
    attachments: [],
    position: 0,
};

export const useModalStore = create<App.Module.Base.Store.ModalStore>((set) => {
    return {
        data: structuredClone(defaultData),
        action: {
            show: (attachments = [], position = 0) => {
                set(
                    produce<App.Module.Base.Store.ModalStore>((store) => {
                        store.data.attachments = attachments;
                        store.data.position = position;
                        store.data.open = attachments.length > 0;
                    })
                );
            },
            hide: () => {
                set(
                    produce<App.Module.Base.Store.ModalStore>((store) => {
                        Object.assign(store.data, defaultData);
                    })
                );
            },
            changePosition: (mode = 'next') => {
                set(
                    produce<App.Module.Base.Store.ModalStore>((store) => {
                        const count = store.data.attachments.length;
                        switch (mode) {
                            case 'next':
                                store.data.position = (store.data.position + 1) % count;
                                return;
                            case 'prev':
                                store.data.position =
                                    store.data.position === 0 ? count - 1 : (store.data.position - 1) % count;
                                return;
                            default: // nothing
                        }
                    })
                );
            },
            setPosition: (position = 0) => {
                set(
                    produce<App.Module.Base.Store.ModalStore>((store) => {
                        store.data.position = position;
                    })
                );
            },
        },
    };
});
