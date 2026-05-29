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
    Payload: { q?: string; limit?: number; skip?: number; page?: number };
    Response: App.ModuleBase.Api.Response<TypeItems<TypeThread>>;
}

export interface CreateThread {
    Payload: { data: Partial<TypeThread> };
    Response: App.ModuleBase.Api.Response<TypeThread>;
}

export interface GetMessages {
    Payload: { tid?: string };
    Response: App.ModuleBase.Api.Response<TypeItems<TypeMessage>>;
}

export interface PostMessage {
    Payload: { data: TypeMessage };
    Response: App.ModuleBase.Api.Response<void>;
}
