/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { UserApiPath } from '@modules/user/constants';

/** services */
import { ApiService } from '@modules/base/services/api';

class UserServices extends ApiService {
    constructor(url = UserApiPath.root) {
        super(url);
    }

    getOne = async (payload: App.Module.User.Api.UserService['Get']['Payload']) => {
        const { uid = '' } = payload;
        const response = await this.withDelay(
            this.get<App.Module.User.Api.UserService['Get']['Response']>({
                url: UserApiPath.user.replace(':uid', uid),
            })
        );

        return response.data;
    };

    gets = async (payload: App.Module.User.Api.UserService['Gets']['Payload']) => {
        const response = await this.withDelay(
            this.get<App.Module.User.Api.UserService['Gets']['Response']>({
                url: UserApiPath.users,
                params: payload,
            })
        );

        return response.data;
    };
}

export const userServices = new UserServices();
