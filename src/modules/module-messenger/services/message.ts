/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { MessengerApiPath } from '@module-messenger/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class MessageService extends ApiService {
    constructor(url = MessengerApiPath.root) {
        super(url);
    }

    getOne = async (payload: App.ModuleMessenger.Api.MessageControllerAction['Get']['Payload']) => {
        const { mid } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.MessageControllerAction['Get']['Response']>({
                url: `${MessengerApiPath.message}/${mid}`,
            })
        );
        return response.data;
    };

    gets = async (payload: App.ModuleMessenger.Api.MessageControllerAction['Gets']['Payload']) => {
        const { q = '', page = '1', skip = '0', limit = '20' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.MessageControllerAction['Gets']['Response']>({
                url: MessengerApiPath.messages,
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

    create = async (payload: App.ModuleMessenger.Api.MessageControllerAction['Create']['Payload']) => {
        const { data } = payload;
        const { tid = '' } = data;
        const response = await this.withDelay(
            this.post<App.ModuleMessenger.Api.MessageControllerAction['Create']['Response']>(
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

export const messageService = new MessageService();
