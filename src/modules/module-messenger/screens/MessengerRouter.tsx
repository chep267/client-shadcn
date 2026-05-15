/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** screens */
const MessengerScreen = React.lazy(() => import('@module-messenger/screens/MessengerScreen'));

export default function MessengerRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<MessengerScreen />} />
                <Route path={MessengerRouterPath.conversation} element={<MessengerScreen />} />
            </Routes>
        </React.Suspense>
    );
}
