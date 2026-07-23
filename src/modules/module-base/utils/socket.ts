/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

/** constants */
import { AppEnv } from '@module-base/constants/env';

let socket: Socket | null = null;

export const connectSocket = (uid: string) => {
    if (socket?.connected) {
        return socket;
    }

    socket = io(AppEnv.apiHost, {
        query: {
            uid,
        },
        withCredentials: true,
        transports: ['websocket'],
    });

    socket.on('connect', () => {
        console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
        console.error('Socket connect error:', error.message);
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    socket?.disconnect();
    socket = null;
};
