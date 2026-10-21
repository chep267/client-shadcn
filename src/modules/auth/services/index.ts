/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AuthApiPath } from '@modules/auth/constants';

/** services */
import { ApiService } from '@modules/base/services/api';

class AuthService extends ApiService {
    constructor(url = AuthApiPath.root) {
        super(url);
    }

    public signin = (payload: App.Module.Auth.Api.AuthService['Signin']['Payload']) => {
        return this.withDelay(
            this.post<
                App.Module.Auth.Api.AuthService['Signin']['Response'],
                App.Module.Auth.Api.AuthService['Signin']['Payload']
            >(payload, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (payload: App.Module.Auth.Api.AuthService['Signout']['Payload']) => {
        return this.withDelay(
            this.post<
                App.Module.Auth.Api.AuthService['Signout']['Response'],
                App.Module.Auth.Api.AuthService['Signout']['Payload']
            >(payload, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (payload: App.Module.Auth.Api.AuthService['Restart']['Payload']) => {
        return this.withDelay(
            this.post<
                App.Module.Auth.Api.AuthService['Restart']['Response'],
                App.Module.Auth.Api.AuthService['Restart']['Payload']
            >(payload, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (payload: App.Module.Auth.Api.AuthService['Register']['Payload']) => {
        return this.withDelay(
            this.post<
                App.Module.Auth.Api.AuthService['Register']['Response'],
                App.Module.Auth.Api.AuthService['Register']['Payload']
            >(payload, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (payload: App.Module.Auth.Api.AuthService['Recover']['Payload']) => {
        return this.withDelay(
            this.post<
                App.Module.Auth.Api.AuthService['Recover']['Response'],
                App.Module.Auth.Api.AuthService['Recover']['Payload']
            >(payload, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authService = new AuthService();
