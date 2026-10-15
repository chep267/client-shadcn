/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { connectSocket, disconnectSocket } from '@modules/base/utils/pusher';

/** stores */
import { useAuthStore } from '@modules/auth/stores/useAuthStore';

export default function AppSocket(): null {
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
