/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { User } from '@module-user/types/data.d';

/** Auth store */
interface AuthStoreData {
    user: User | null;
    prePath: string;
    token: string;
}
interface AuthStoreAction {
    setData: (options?: Partial<AuthStoreData>) => void;
    refreshToken: () => void;
}
export interface AuthStore {
    data: AuthStoreData;
    action: AuthStoreAction;
}
