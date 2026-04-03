/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data.d';

export interface TypeUserApi {
    Create: {
        Payload: { user: TypeUser };
        Response?: void;
    };
    Get: {
        Payload: { uid: TypeUser['uid'] };
        Response?: TypeUser;
    };
    GetList: {
        Payload?: { limit?: number };
        Response?: { itemIds: App.ModuleBase.Data.TypeItemIds; items: App.ModuleBase.Data.TypeItems<TypeUser> };
    };
}
