/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useEffect } from 'react';

/** utils */
import { connectSocket, disconnectSocket } from '@module-base/utils/socket';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function AppSocket() {
    const uid = useAuthStore((store) => store.data.user?.id ?? '');

    useEffect(() => {
        if (!uid) return;

        const socket = connectSocket(uid);

        socket.on('notification', (data) => {
            console.log('New notification:', data);
        });

        return () => {
            socket.off('notification');
            disconnectSocket();
        };
    }, [uid]);

    return null;
}
