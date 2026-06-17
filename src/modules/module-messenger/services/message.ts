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

    getOne = async (payload: App.ModuleMessenger.Api.MessageService['Get']['Payload']) => {
        const { mid } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.MessageService['Get']['Response']>({
                url: MessengerApiPath.message.replace(':mid', mid),
            })
        );
        return response.data;
    };

    gets = async (payload: App.ModuleMessenger.Api.MessageService['Gets']['Payload']) => {
        const { tid, ...params } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleMessenger.Api.MessageService['Gets']['Response']>({
                url: MessengerApiPath.messages.replace(':tid', tid),
                params,
            })
        );
        return response.data;
    };

    create = async (payload: App.ModuleMessenger.Api.MessageService['Create']['Payload']) => {
        const { tid } = payload.data;
        const response = await this.withDelay(
            this.post<App.ModuleMessenger.Api.MessageService['Create']['Response']>(payload, {
                url: MessengerApiPath.messages.replace(':tid', tid),
            })
        );
        return response.data;
    };

    revoke = async (payload: App.ModuleMessenger.Api.MessageService['Revoke']['Payload']) => {
        const { tid } = payload;
        const response = await this.withDelay(
            this.delete<App.ModuleMessenger.Api.MessageService['Revoke']['Response']>({
                url: MessengerApiPath.thread.replace(':tid', tid),
            })
        );
        return response.data;
    };
}

export const messageService = new MessageService();
