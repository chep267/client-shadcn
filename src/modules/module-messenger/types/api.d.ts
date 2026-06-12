/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@module-base/types/api.d';
import type { TypeThread, TypeMessage } from '@module-messenger/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api thread */
export interface ThreadControllerAction {
    Get: {
        Payload: { tid: string };
        Response: ApiResponse<TypeThread>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<TypeThread[]>;
    };
    Create: {
        Payload: { data: Partial<TypeThread> };
        Response: ApiResponse<TypeThread>;
    };
    Update: {
        Request: Omit<Request, 'params' | 'body'> & { params: { tid: string }; body: { data: Partial<TypeThread> } };
        Response: ApiResponse<TypeThread | null>;
    };
    Read: {
        Request: Omit<Request, 'params'> & { params: { tid: string } };
        Response: ApiResponse<TypeThread | null>;
    };
    Remove: {
        Request: Omit<Request, 'params'> & { params: { tid: string } };
        Response: ApiResponse<boolean>;
    };
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api message */
export interface MessageControllerAction {
    Get: {
        Payload: { mid: string };
        Response: ApiResponse<TypeMessage>;
    };
    Gets: {
        Payload: SearchParam<{ tid: string }>;
        Response: ApiSearchResponse<TypeMessage[]>;
    };
    Create: {
        Payload: { data: TypeMessage };
        Response: ApiResponse<TypeMessage>;
    };
    Update: {
        Request: Omit<Request, 'params' | 'body'> & { params: { tid: string }; body: { data: Partial<TypeThread> } };
        Response: ApiResponse<TypeMessage | null>;
    };
    Remove: {
        Request: Omit<Request, 'params'> & { params: { tid: string } };
        Response: ApiResponse<boolean>;
    };
}
