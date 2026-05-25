/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types/data.d';
import type { TypeThread, TypeMessage } from '@module-messenger/types/data.d';

export interface TypeApi {
    GetThreads: {
        Payload: { uid?: string; searchKey?: string; limit?: number };
        Response: App.ModuleBase.Api.Response<{ itemIds: TypeItemIds; items: TypeItems<TypeThread> }>;
    };
    GetThread: {
        Payload: { tid?: string };
        Response: App.ModuleBase.Api.Response<TypeThread>;
    };
    GetMessages: {
        Payload: { tid?: string };
        Response: App.ModuleBase.Api.Response<{ itemIds: TypeItemIds; items: TypeItems<TypeMessage> }>;
    };
}
