/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data.d';

/** api user */
export interface GetUser {
    Payload: { uid?: string };
    Response: App.ModuleBase.Api.Response<TypeUser>;
}

export interface GetUsers {
    Payload: { searchKey?: string; limit?: number; skip?: number; page?: number };
    Response: App.ModuleBase.Api.Response<TypeUser[], { total: number }>;
}
