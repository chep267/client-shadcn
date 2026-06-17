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

    getOne = async (payload: App.ModuleMessenger.Api.ThreadService['Get']['Payload']) => {
        const { tid } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.ThreadService['Get']['Response']>({
                url: MessengerApiPath.thread.replace(':tid', tid),
            })
        );
        return response.data;
    };

    gets = async (payload: App.ModuleMessenger.Api.ThreadService['Gets']['Payload']) => {
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.ThreadService['Gets']['Response']>({
                url: MessengerApiPath.threads,
                params: payload,
            })
        );
        return response.data;
    };

    create = async (payload: App.ModuleMessenger.Api.ThreadService['Create']['Payload']) => {
        const response = await this.withDelay(
            this.post<App.ModuleMessenger.Api.ThreadService['Create']['Response']>(payload, {
                url: MessengerApiPath.threads,
            })
        );
        return response.data;
    };

    remove = async (payload: App.ModuleMessenger.Api.ThreadService['Remove']['Payload']) => {
        const { tid } = payload;
        const response = await this.withDelay(
            this.delete<App.ModuleMessenger.Api.ThreadService['Remove']['Response']>({
                url: MessengerApiPath.thread.replace(':tid', tid),
            })
        );
        return response.data;
    };
}

export const threadService = new ThreadService();
