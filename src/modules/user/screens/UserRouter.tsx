/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router';

/** constants */
import { UserRouterPath } from '@modules/user/constants';

/** screens */
const UserScreen = React.lazy(() => import('@modules/user/screens/UserScreen'));

export default function UserRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<UserScreen />} />
                <Route path={UserRouterPath.profile} element={<UserScreen />} />
            </Routes>
        </React.Suspense>
    );
}
