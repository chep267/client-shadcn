/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { connectSocket, disconnectSocket } from '@module-base/utils/pusher';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function AppSocket() {
    const meId = useAuthStore((store) => store.data.user?.id);

    React.useEffect(() => {
        if (!meId) return;

        connectSocket(meId);

        return () => {
            disconnectSocket();
        };
    }, [meId]);

    return null;
}
