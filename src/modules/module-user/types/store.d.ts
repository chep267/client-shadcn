/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** user store */
export interface UserStore {
    data: {
        list: TypeUser[];
        map: Map<string, TypeUser>;
        metadata: Record<string, unknown>;
    };
    action: {
        add: (item: TypeUser) => void;
        remove: (uid: string) => void;
    };
}
