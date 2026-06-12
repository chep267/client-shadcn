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

    public signin = (payload: App.ModuleAuth.Api.Signin['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Signin['Response'], App.ModuleAuth.Api.Signin['Payload']>(payload, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (payload: App.ModuleAuth.Api.Signout['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Signout['Response'], App.ModuleAuth.Api.Signout['Payload']>(payload, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (payload: App.ModuleAuth.Api.Restart['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Restart['Response'], App.ModuleAuth.Api.Restart['Payload']>(payload, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (payload: App.ModuleAuth.Api.Register['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Register['Response'], App.ModuleAuth.Api.Register['Payload']>(payload, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (payload: App.ModuleAuth.Api.Recover['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Recover['Response'], App.ModuleAuth.Api.Recover['Payload']>(payload, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authService = new AuthService();
