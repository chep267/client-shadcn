/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { SearchMetadata } from '@module-base/types/api.d';
import type { User } from '@module-user/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** user store */
type UserStoreData = {
    users: Map<string, User>;
    metadata: SearchMetadata;
};
type UserStoreAction = {
    add: (user: User) => void;
    multiAdd: (users: User[], metadata?: SearchMetadata) => void;
    remove: (uid: User['id']) => void;
};
export type UserStore = {
    data: UserStoreData;
    action: UserStoreAction;
};
