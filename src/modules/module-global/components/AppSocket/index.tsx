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
    const meId = useAuthStore((store) => store.data.user?.id);

    useEffect(() => {
        if (!meId) return;

        connectSocket(meId);

        return () => {
            disconnectSocket();
        };
    }, [meId]);

    return null;
}
