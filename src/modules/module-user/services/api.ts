/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { UserApiPath } from '@module-user/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class UserServices extends ApiService {
    constructor(url = UserApiPath.root) {
        super(url);
    }

    getOne = async (payload: App.ModuleUser.Api.UserService['Get']['Payload']) => {
        const { uid = '' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleUser.Api.UserService['Get']['Response']>({
                url: UserApiPath.user.replace(':uid', uid),
            })
        );

        return response.data;
    };

    gets = async (payload: App.ModuleUser.Api.UserService['Gets']['Payload']) => {
        const response = await this.withDelay(
            this.get<App.ModuleUser.Api.UserService['Gets']['Response']>({
                url: UserApiPath.users,
                params: payload,
            })
        );

        return response.data;
    };
}

export const userServices = new UserServices();
