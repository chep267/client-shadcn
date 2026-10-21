/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router';

/** constants */
import { MessengerRouterPath } from '@modules/messenger/constants';

/** screens */
const MessengerScreen = React.lazy(() => import('@modules/messenger/screens/MessengerScreen'));

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
