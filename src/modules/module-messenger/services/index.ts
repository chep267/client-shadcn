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

    public getThreads = async () => {
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.TypeApi['GetThreads']['Response']>({
                url: MessengerApiPath.threads,
            })
        );
        return response.data.data;
    };

    public getThread = async (payload: App.ModuleMessenger.Api.TypeApi['GetThread']['Payload']) => {
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.TypeApi['GetThread']['Response']>({
                url: MessengerApiPath.threads,
                params: payload,
            })
        );
        return response.data.data;
    };
}

export const messengerService = new MessengerService();
