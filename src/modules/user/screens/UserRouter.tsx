/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router';

/** screens */
const UserScreen = React.lazy(() => import('@modules/user/screens/UserScreen'));

export default function UserRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<UserScreen />} />
                <Route path=":uid" element={<UserScreen />} />
            </Routes>
        </React.Suspense>
    );
}
