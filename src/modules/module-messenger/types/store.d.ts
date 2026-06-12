/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeMessage, TypeThread } from '@module-messenger/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** messenger store */
type TypeData = {
    openInfo: boolean;
    openSearch: boolean;
    searchKey: string;
    drafts: Map<string, string>;
    attachments: Map<string, File[]>;
};
type TypeAction = {
    toggleInfo: () => void;
    toggleSearch: () => void;
    closeSearch: () => void;
    changeSearchKey: (value: string) => void;
    addDraft: (payload: { tid?: string; draft?: string }) => void;
    addAttachments: (payload: { tid?: string; attachments?: File[] }) => void;
    removeAsset: (payload: { tid?: string; pos: number }) => void;
    genMessage: (payload: Pick<TypeMessage, 'tid' | 'uid'>) => TypeMessage;
    genThread: (payload: Partial<TypeThread>) => TypeThread;
    sentMessage: (payload: { tid: string }) => void;
};
export type TypeMessengerStore = {
    data: TypeData;
    action: TypeAction;
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** thread store */
export interface ThreadStore {
    data: {
        list: TypeThread[];
        map: Map<string, TypeThread>;
        metadata: Record<string, unknown>;
    };
    action: {
        add: (item: TypeThread) => void;
        remove: (tid: string) => void;
    };
}
