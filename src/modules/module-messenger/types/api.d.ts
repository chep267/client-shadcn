/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeItems } from '@module-base/types/data.d';
import type { TypeThread, TypeMessage } from '@module-messenger/types/data.d';

/** api thread */
export interface GetThread {
    Payload: { tid?: string };
    Response: App.ModuleBase.Api.Response<TypeThread>;
}

export interface GetThreads {
    Payload: { searchKey?: string; limit?: number; skip?: number; page?: number };
    Response: App.ModuleBase.Api.Response<TypeItems<TypeThread>>;
}

export interface GetMessages {
    Payload: { tid?: string };
    Response: App.ModuleBase.Api.Response<TypeItems<TypeMessage>>;
}
