/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types';

/** api signin */
export interface Signin {
    Payload: { email: string; password: string };
    Response: App.ModuleBase.Api.ApiResponse<TypeUser, { token: { exp: number; value: string } }>;
}

/** api signout */
export interface Signout {
    Payload: void;
    Response: App.ModuleBase.Api.ApiResponse<null>;
}

/** api restart */
export interface Restart {
    Payload: void;
    Response: App.ModuleBase.Api.ApiResponse<TypeUser, { token: { exp: number; value: string } }>;
}

/** api register */
export interface Register {
    Payload: { email: string; password: string };
    Response: App.ModuleBase.Api.ApiResponse<null>;
}

/** api recover */
export interface Recover {
    Payload: { email: string };
    Response: App.ModuleBase.Api.ApiResponse<null>;
}
