/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { AppSidebarMini } from '@module-global/components/AppSidebarMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const FeedScreen = React.lazy(() => import('@module-global/screens/FeedScreen'));
const DashboardScreen = React.lazy(() => import('@module-dashboard/screens/DashboardScreen'));

export function MainRoute() {
    return (
        <main data-slot="sidebar-content" className={cn('flex flex-1 flex-col', 'min-w-0')}>
            <AppSidebarMini />
            <React.Suspense>
                <Routes>
                    {[...Object.values(AuthRouterPath), AppRouterPath.home].map((path) => (
                        <Route key={path} path={path} element={<Navigate to={AppRouterPath.defaultPath} />} />
                    ))}
                    <Route path={AppRouterPath.dashboard} element={<DashboardScreen />} />
                    <Route path={AppRouterPath.feed} element={<FeedScreen />} />
                    <Route path={AppRouterPath.calendar} element={<div />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </main>
    );
}
