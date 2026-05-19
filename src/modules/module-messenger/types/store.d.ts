/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
type TypeData = {
    openInfo: boolean;
    openSearch: boolean;
    searchKey: string;
    drafts: Map<string, string>;
    typings: Map<string, boolean>;
    assets: Map<string, File[]>;
};
type TypeAction = {
    toggleInfo: () => void;
    toggleSearch: () => void;
    changeSearchKey: (value: string) => void;
    addDraft: (payload: { tid?: string; draft?: string }) => void;
    addTyping: (payload: { tid?: string; typing?: boolean }) => void;
    addAssets: (payload: { tid?: string; assets?: File[] }) => void;
    removeAsset: (payload: { tid?: string; pos: number }) => void;
};
export type TypeMessengerStore = {
    data: TypeData;
    action: TypeAction;
};
