/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@modules/base/types/api.d';
import type { User } from '@modules/user/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api user */
export interface UserService {
    Get: {
        Payload: { uid: string };
        Response: ApiResponse<User>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<User[]>;
    };
    Create: {
        Payload: { data: User };
        Response: ApiResponse<User>;
    };
    Update: {
        Request: Omit<Request, 'params' | 'body'> & { params: { uid: string }; body: { data: Partial<User> } };
        Response: ApiResponse<User | null>;
    };
    Remove: {
        Request: Omit<Request, 'params'> & { params: { uid: string } };
        Response: ApiResponse<boolean>;
    };
}
