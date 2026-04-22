/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** screens */
const UserScreen = React.lazy(() => import('@module-user/screens/UserScreen'));

export default function UserRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<UserScreen />} />
            </Routes>
        </React.Suspense>
    );
}
