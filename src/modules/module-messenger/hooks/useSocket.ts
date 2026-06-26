/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { MessengerSocketEvent } from '@module-messenger/constants/key';

/** utils */
import { getChannel } from '@module-base/utils/pusher';

/** services */
import { socketService } from '@module-messenger/services/socket';

export const useSocket = () => {
    React.useEffect(() => {
        const chanel = getChannel();
        if (!chanel) return;

        chanel.bind(MessengerSocketEvent.THREAD_CREATED, socketService.receiveThread);
        chanel.bind(MessengerSocketEvent.MESSAGE_CREATED, socketService.receiveMessage);

        return () => {
            chanel.unbind(MessengerSocketEvent.THREAD_CREATED, socketService.receiveThread);
            chanel.unbind(MessengerSocketEvent.MESSAGE_CREATED, socketService.receiveMessage);
        };
    }, []);
};
