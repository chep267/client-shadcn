/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** constants */
import { DashboardRouterPath } from '@module-dashboard/constants/path';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const DashboardScreen = React.lazy(() => import('@module-dashboard/screens/DashboardScreen'));
const AgeCalculatorScreen = React.lazy(() => import('@module-global/screens/AgeCalculatorScreen'));

export default function DashboardRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<DashboardScreen />} />
                <Route path={DashboardRouterPath.ageCalculator} element={<AgeCalculatorScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </React.Suspense>
    );
}
