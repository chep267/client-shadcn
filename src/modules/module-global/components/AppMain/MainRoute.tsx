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

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const ProjectPage = React.lazy(() => import('@module-global/screens/ProjectPage'));

export default function MainRoute() {
    return (
        <div className="flex h-full w-full flex-col">
            <AppSidebarMini />
            <React.Suspense>
                <Routes>
                    <Route path={AppRouterPath.home} element={<Navigate to={AppRouterPath.defaultPath} />} />
                    <Route path={AppRouterPath.dashboard} element={<ProjectPage />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </div>
    );
}
