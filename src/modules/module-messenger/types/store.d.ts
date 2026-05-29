/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeMessage, TypeThread } from '@module-messenger/types/data';

type TypeData = {
    openInfo: boolean;
    openSearch: boolean;
    searchKey: string;
    drafts: Map<string, string>;
    typings: Map<string, boolean>;
    attachments: Map<string, File[]>;
};
type TypeAction = {
    toggleInfo: () => void;
    toggleSearch: () => void;
    closeSearch: () => void;
    changeSearchKey: (value: string) => void;
    addDraft: (payload: { tid?: string; draft?: string }) => void;
    addTyping: (payload: { tid?: string; typing?: boolean }) => void;
    addAttachments: (payload: { tid?: string; attachments?: File[] }) => void;
    removeAsset: (payload: { tid?: string; pos: number }) => void;
    genMessage: (payload: Pick<TypeMessage, 'tid' | 'uid'>) => TypeMessage;
    genThread: (payload: Partial<TypeThread>) => TypeThread;
};
export type TypeMessengerStore = {
    data: TypeData;
    action: TypeAction;
};
