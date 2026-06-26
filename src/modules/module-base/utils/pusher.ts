/**
 *
 * @author dongntd267@gmail.com
 *
 */
/** libs */
import Pusher, { Channel } from 'pusher-js';
import Cookies from 'js-cookie';

/** constants */
import { AppEnv, AppKey } from '@module-base/constants/env';
import { AuthApiPath } from '@module-auth/constants/path';

Pusher.logToConsole = import.meta.env.DEV;
let pusher: Pusher | null = null;
let userChannel: Channel | null = null;

export const connectSocket = (uid: string) => {
    if (pusher?.connection.state === 'connected') {
        return pusher;
    }

    pusher = new Pusher(AppEnv.pusher.key, {
        cluster: AppEnv.pusher.cluster,
        authEndpoint: `${AppEnv.apiHost}${AuthApiPath.root}${AuthApiPath.socket}`,
        auth: {
            headers: {
                Authorization: `Bearer ${Cookies.get(AppKey.token)}`,
            },
        },
    });
    pusher.connection.bind('connected', () => {
        console.log('Socket connected');
    });
    pusher.connection.bind('disconnected', () => {
        console.log('Socket disconnected');
    });
    pusher.connection.bind('error', (error: unknown) => {
        console.error('Socket connect error:', error);
    });

    userChannel = pusher.subscribe(uid);
    return pusher;
};

export const getSocket = () => pusher;

export const getChannel = () => userChannel;

export const disconnectSocket = () => {
    if (userChannel) {
        userChannel?.unbind_all();
        pusher?.unsubscribe(userChannel.name);
        userChannel = null;
    }
    pusher?.disconnect();
    pusher = null;
};
