/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AuthApiPath } from '@module-auth/constants/path';

/** services */
import { BaseService } from '@module-base/services';

class AuthService extends BaseService {
    constructor(url = AuthApiPath.root) {
        super(url);
    }

    public signin = (payload: App.ModuleAuth.Api.TypeApi['Signin']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApi['Signin']['Response'],
                App.ModuleAuth.Api.TypeApi['Signin']['Payload']
            >(payload, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (payload: App.ModuleAuth.Api.TypeApi['Signout']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApi['Signout']['Response'],
                App.ModuleAuth.Api.TypeApi['Signout']['Payload']
            >(payload, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (payload: App.ModuleAuth.Api.TypeApi['Restart']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApi['Restart']['Response'],
                App.ModuleAuth.Api.TypeApi['Restart']['Payload']
            >(payload, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (payload: App.ModuleAuth.Api.TypeApi['Register']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApi['Register']['Response'],
                App.ModuleAuth.Api.TypeApi['Register']['Payload']
            >(payload, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (payload: App.ModuleAuth.Api.TypeApi['Recover']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApi['Recover']['Response'],
                App.ModuleAuth.Api.TypeApi['Recover']['Payload']
            >(payload, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authService = new AuthService();
