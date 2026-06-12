/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@module-base/types/api.d';
import type { TypeUser } from '@module-user/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api user */
export interface UserControllerAction {
    Get: {
        Payload: { uid: string };
        Response: ApiResponse<TypeUser>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<TypeUser[]>;
    };
    Create: {
        Payload: { data: TypeUser };
        Response: ApiResponse<TypeUser>;
    };
    Update: {
        Request: Omit<Request, 'params' | 'body'> & { params: { uid: string }; body: { data: Partial<TypeUser> } };
        Response: ApiResponse<TypeUser | null>;
    };
    Remove: {
        Request: Omit<Request, 'params'> & { params: { uid: string } };
        Response: ApiResponse<boolean>;
    };
}
