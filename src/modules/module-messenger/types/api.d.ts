/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@module-base/types/api.d';
import type { Thread, Message } from '@module-messenger/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api thread */
export interface ThreadControllerAction {
    Get: {
        Payload: { tid: string };
        Response: ApiResponse<Thread>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<Thread[]>;
    };
    Create: {
        Payload: { data: Partial<Thread> };
        Response: ApiResponse<Thread>;
    };
    Update: {
        Request: Omit<Request, 'params' | 'body'> & { params: { tid: string }; body: { data: Partial<Thread> } };
        Response: ApiResponse<Thread | null>;
    };
    Read: {
        Request: Omit<Request, 'params'> & { params: { tid: string } };
        Response: ApiResponse<Thread | null>;
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
        Response: ApiResponse<Message>;
    };
    Gets: {
        Payload: SearchParam<{ tid: string }>;
        Response: ApiSearchResponse<Message[]>;
    };
    Create: {
        Payload: { data: Message };
        Response: ApiResponse<Message>;
    };
    Update: {
        Request: Omit<Request, 'params' | 'body'> & { params: { tid: string }; body: { data: Partial<Thread> } };
        Response: ApiResponse<Message | null>;
    };
    Remove: {
        Request: Omit<Request, 'params'> & { params: { tid: string } };
        Response: ApiResponse<boolean>;
    };
}
