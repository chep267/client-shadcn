/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { User } from '@module-user/types/data.d';

/** Auth store */
type AuthStoreData = {
    user: User | null;
    prePath: string;
    token: string;
};
type AuthStoreAction = {
    setData: (options?: Partial<AuthStoreData>) => void;
    refreshToken: () => void;
};
export type AuthStore = {
    data: AuthStoreData;
    action: AuthStoreAction;
};
