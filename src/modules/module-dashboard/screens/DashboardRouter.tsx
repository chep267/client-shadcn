/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** screens */
const DashboardScreen = React.lazy(() => import('@module-dashboard/screens/DashboardScreen'));

export default function DashboardRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<DashboardScreen />} />
            </Routes>
        </React.Suspense>
    );
}
