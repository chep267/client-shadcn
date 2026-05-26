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

    public getThreads = async (payload?: App.ModuleMessenger.Api.GetThreads['Payload']) => {
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.GetThreads['Response']>({
                url: MessengerApiPath.threads,
                params: payload,
            })
        );
        return response.data;
    };

    public getMessages = async (payload: App.ModuleMessenger.Api.GetMessages['Payload']) => {
        const { tid = '' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.GetMessages['Response']>({
                url: MessengerApiPath.messages.replace(':tid', tid),
            })
        );
        return response.data;
    };
}

export const messengerService = new MessengerService();
