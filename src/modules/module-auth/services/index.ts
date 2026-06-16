/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AuthApiPath } from '@module-auth/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class AuthService extends ApiService {
    constructor(url = AuthApiPath.root) {
        super(url);
    }

    public signin = (payload: App.ModuleAuth.Api.AuthControllerAction['Signin']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthControllerAction['Signin']['Response'],
                App.ModuleAuth.Api.AuthControllerAction['Signin']['Payload']
            >(payload, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (payload: App.ModuleAuth.Api.AuthControllerAction['Signout']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthControllerAction['Signout']['Response'],
                App.ModuleAuth.Api.AuthControllerAction['Signout']['Payload']
            >(payload, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (payload: App.ModuleAuth.Api.AuthControllerAction['Restart']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthControllerAction['Restart']['Response'],
                App.ModuleAuth.Api.AuthControllerAction['Restart']['Payload']
            >(payload, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (payload: App.ModuleAuth.Api.AuthControllerAction['Register']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthControllerAction['Register']['Response'],
                App.ModuleAuth.Api.AuthControllerAction['Register']['Payload']
            >(payload, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (payload: App.ModuleAuth.Api.AuthControllerAction['Recover']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthControllerAction['Recover']['Response'],
                App.ModuleAuth.Api.AuthControllerAction['Recover']['Payload']
            >(payload, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authService = new AuthService();
