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
        const {
            data: { data },
        } = await this.withDelay(
            this.get<App.ModuleUser.Api.GetUser['Response']>({
                url: UserApiPath.user.replace(':uid', uid),
            })
        );

        return {
            data,
        };
    };

    public getUsers = async (params?: App.ModuleUser.Api.GetUsers['Payload']) => {
        const { searchKey = '', page = 1, skip = 0, limit = 20 } = params ?? {};
        const {
            data: { data, metadata },
        } = await this.withDelay(
            this.get<App.ModuleUser.Api.GetUsers['Response']>({
                url: UserApiPath.users,
                params: {
                    searchKey,
                    page,
                    skip,
                    limit,
                },
            })
        );

        return {
            data,
            metadata,
        };
    };
}

export const userServices = new UserServices();
