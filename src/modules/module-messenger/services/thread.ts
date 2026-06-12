/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { MessengerApiPath } from '@module-messenger/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class ThreadService extends ApiService {
    constructor(url = MessengerApiPath.root) {
        super(url);
    }

    getOne = async (payload: App.ModuleMessenger.Api.ThreadControllerAction['Get']['Payload']) => {
        const { tid } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.ThreadControllerAction['Get']['Response']>({
                url: `${MessengerApiPath.threads}/${tid}`,
            })
        );
        return response.data;
    };

    gets = async (payload: App.ModuleMessenger.Api.ThreadControllerAction['Gets']['Payload']) => {
        const { q = '', page = '1', skip = '0', limit = '20' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.ThreadControllerAction['Gets']['Response']>({
                url: MessengerApiPath.threads,
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

    create = async (payload: App.ModuleMessenger.Api.ThreadControllerAction['Create']['Payload']) => {
        const response = await this.withDelay(
            this.post<App.ModuleMessenger.Api.ThreadControllerAction['Create']['Response']>(payload, {
                url: MessengerApiPath.threads,
            })
        );
        return response.data;
    };
}

export const threadService = new ThreadService();
