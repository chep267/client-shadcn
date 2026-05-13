/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { DashboardRouterPath } from '@module-dashboard/constants/DashboardRouterPath';
import { CalendarRouterPath } from '@module-calendar/constants/CalendarRouterPath';
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';
import { PoemRouterPath } from '@modules/module-poem/constants/PoemRouterPath';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { AppSidebarMini } from '@module-global/components/AppSidebarMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const DashboardRouter = React.lazy(() => import('@module-dashboard/screens/DashboardRouter'));
const CalendarRouter = React.lazy(() => import('@module-calendar/screens/CalendarRouter'));
const PoemRouter = React.lazy(() => import('@module-poem/screens/PoemRouter'));
const UserRouter = React.lazy(() => import('@module-user/screens/UserRouter'));
const FeedScreen = React.lazy(() => import('@module-global/screens/FeedScreen'));
const AgeCalculatorScreen = React.lazy(() => import('@module-global/screens/AgeCalculatorScreen'));

export function AppRouter() {
    return (
        <main data-slot="sidebar-content" className={cn('flex flex-1 flex-col', 'min-w-0')}>
            <AppSidebarMini />
            <React.Suspense>
                <Routes>
                    {[...Object.values(AuthRouterPath), GlobalRouterPath.home].map((path) => (
                        <Route key={path} path={path} element={<Navigate to={DashboardRouterPath.home} />} />
                    ))}
                    <Route path={DashboardRouterPath.home} element={<DashboardRouter />} />
                    <Route path={GlobalRouterPath.feed} element={<FeedScreen />} />
                    <Route path={GlobalRouterPath.ageCalculator} element={<AgeCalculatorScreen />} />
                    <Route path={CalendarRouterPath.home} element={<CalendarRouter />} />
                    <Route path={PoemRouterPath.home} element={<PoemRouter />} />
                    <Route path={PoemRouterPath.home} element={<PoemRouter />} />
                    <Route path={GlobalRouterPath.account} element={<UserRouter />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </main>
    );
}
