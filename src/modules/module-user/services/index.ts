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

    public getUser = async (params?: App.ModuleUser.Api.GetUser['Payload']) => {
        const { uid = '' } = params ?? {};
        const response = await this.withDelay(
            this.get<App.ModuleUser.Api.GetUser['Response']>({
                url: UserApiPath.user.replace(':id', uid),
            })
        );

        return response.data;
    };

    public getUsers = async (params?: App.ModuleUser.Api.GetUsers['Payload']) => {
        const { q = '', page = 1, skip = 0, limit = 20 } = params ?? {};
        const response = await this.withDelay(
            this.get<App.ModuleUser.Api.GetUsers['Response']>({
                url: UserApiPath.users,
                params: {
                    q,
                    page,
                    skip,
                    limit,
                },
            })
        );

        return response.data;
    };
}

export const userServices = new UserServices();
