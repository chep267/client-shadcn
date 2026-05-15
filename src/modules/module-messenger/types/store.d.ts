/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
type TypeData = {
    openInfo: boolean;
};
type TypeAction = {
    toggleInfo: () => void;
};
export type TypeMessengerStore = {
    data: TypeData;
    action: TypeAction;
};
