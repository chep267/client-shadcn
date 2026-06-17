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
export interface ThreadService {
    Get: {
        Payload: { tid: Thread['id'] };
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
        Payload: { tid: Thread['id']; data: Partial<Thread> };
        Response: ApiResponse<Thread | null>;
    };
    Read: {
        Payload: { tid: Thread['id'] };
        Response: ApiResponse<Thread | null>;
    };
    Remove: {
        Payload: { tid: Thread['id'] };
        Response: ApiResponse<boolean>;
    };
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api message */
export interface MessageService {
    Get: {
        Payload: { mid: Message['id'] };
        Response: ApiResponse<Message>;
    };
    Gets: {
        Payload: SearchParam<{ tid: Thread['id'] }>;
        Response: ApiSearchResponse<Message[]>;
    };
    Create: {
        Payload: { data: Message };
        Response: ApiResponse<Message>;
    };
    Update: {
        Payload: { tid: Thread['id']; data: Partial<Message> };
        Response: ApiResponse<Message | null>;
    };
    Revoke: {
        Payload: SearchParam<{ tid: Thread['id']; mid: Message['id'] }>;
        Response: ApiResponse<boolean>;
    };
}
