/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { MessengerApiPath } from '@module-messenger/constants/path';

/** services */
import { BaseService } from '@module-base/services';

class MessengerService extends BaseService {
    constructor(url = MessengerApiPath.root) {
        super(url);
    }

    getThreads = async (payload: App.ModuleMessenger.Api.GetThreads['Payload'] = {}) => {
        const { q = '', page = 1, skip = 0, limit = 20 } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.GetThreads['Response']>({
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

    createThread = async (payload: App.ModuleMessenger.Api.CreateThread['Payload']) => {
        const response = await this.withDelay(
            this.post<App.ModuleMessenger.Api.CreateThread['Response']>(payload, {
                url: MessengerApiPath.threads,
            })
        );
        return response.data;
    };

    getMessages = async (payload: App.ModuleMessenger.Api.GetMessages['Payload']) => {
        const { tid = '' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.GetMessages['Response']>({
                url: MessengerApiPath.messages.replace(':tid', tid),
            })
        );
        return response.data;
    };

    postMessage = async (payload: App.ModuleMessenger.Api.PostMessage['Payload']) => {
        const { data } = payload;
        const { tid = '' } = data;
        const response = await this.withDelay(
            this.post<App.ModuleMessenger.Api.PostMessage['Response']>(
                {
                    data,
                },
                {
                    url: MessengerApiPath.messages.replace(':tid', tid),
                }
            )
        );
        return response.data;
    };
}

export const messengerService = new MessengerService();
