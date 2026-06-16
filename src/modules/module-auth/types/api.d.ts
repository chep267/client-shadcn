/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse } from '@module-base/types/api.d';
import type { User } from '@module-user/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api auth */
export interface AuthControllerAction {
    Signin: {
        Payload: { email: string; password: string };
        Response: ApiResponse<User, { token: { exp: number; value: string } }>;
    };
    Signout: {
        Payload: void;
        Response: ApiResponse<null>;
    };
    Restart: {
        Payload: void;
        Response: ApiResponse<User, { token: { exp: number; value: string } }>;
    };
    Register: {
        Payload: { email: string; password: string };
        Response: ApiResponse<null>;
    };
    Recover: {
        Payload: { email: string };
        Response: ApiResponse<null>;
    };
}
