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

    public signin = (payload: App.ModuleAuth.Api.AuthService['Signin']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthService['Signin']['Response'],
                App.ModuleAuth.Api.AuthService['Signin']['Payload']
            >(payload, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (payload: App.ModuleAuth.Api.AuthService['Signout']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthService['Signout']['Response'],
                App.ModuleAuth.Api.AuthService['Signout']['Payload']
            >(payload, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (payload: App.ModuleAuth.Api.AuthService['Restart']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthService['Restart']['Response'],
                App.ModuleAuth.Api.AuthService['Restart']['Payload']
            >(payload, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (payload: App.ModuleAuth.Api.AuthService['Register']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthService['Register']['Response'],
                App.ModuleAuth.Api.AuthService['Register']['Payload']
            >(payload, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (payload: App.ModuleAuth.Api.AuthService['Recover']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.AuthService['Recover']['Response'],
                App.ModuleAuth.Api.AuthService['Recover']['Payload']
            >(payload, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authService = new AuthService();
