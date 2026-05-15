/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { UserApiPath } from '@module-user/constants/path';

/** services */
import { BaseService } from '@module-base/services';

class UserServices extends BaseService {
    constructor(url = UserApiPath.root) {
        super(url);
    }

    public create = (data: App.ModuleUser.Api.TypeApi['Create']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleUser.Api.TypeApi['Create']['Response'],
                App.ModuleUser.Api.TypeApi['Create']['Payload']
            >(data, {
                url: UserApiPath.create,
            })
        );
    };

    public getList = (params?: App.ModuleUser.Api.TypeApi['GetList']['Payload']) => {
        return this.withDelay(
            this.get<App.ModuleUser.Api.TypeApi['GetList']['Response']>({
                url: UserApiPath.getList,
                params,
            })
        );
    };

    public getOne = (params?: App.ModuleUser.Api.TypeApi['Get']['Payload']) => {
        return this.withDelay(
            this.get<App.ModuleUser.Api.TypeApi['Get']['Response']>({
                url: UserApiPath.getList,
                params,
            })
        );
    };
}

export const userServices = new UserServices();
