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

    getOne = async (payload: App.ModuleUser.Api.UserControllerAction['Get']['Payload']) => {
        const { uid = '' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleUser.Api.UserControllerAction['Get']['Response']>({
                url: UserApiPath.user.replace(':uid', uid),
            })
        );

        return response.data;
    };

    gets = async (payload: App.ModuleUser.Api.UserControllerAction['Gets']['Payload']) => {
        const { q = '', page = '1', skip = '0', limit = '20' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleUser.Api.UserControllerAction['Gets']['Response']>({
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
