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

/** components */
import AppSidebarMini from '@module-global/components/AppSidebarMini';
import { cn } from '@module-base/utils/shadcn';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const FeedScreen = React.lazy(() => import('@module-global/screens/FeedScreen'));
const ProjectPage = React.lazy(() => import('@module-global/screens/ProjectPage'));

export default function MainRoute() {
    return (
        <main data-slot="sidebar-content" className={cn('flex flex-1 flex-col', 'min-w-0')}>
            <AppSidebarMini />
            <React.Suspense>
                <Routes>
                    <Route path={AppRouterPath.home} element={<Navigate to={AppRouterPath.defaultPath} />} />
                    <Route path={AppRouterPath.feed} element={<FeedScreen />} />
                    <Route path={AppRouterPath.dashboard} element={<ProjectPage />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </main>
    );
}
