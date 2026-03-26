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
const ProjectPage = React.lazy(() => import('@module-global/screens/ProjectPage'));

export default function MainRoute() {
    return (
        <div
            data-slot="sidebar-content"
            className={cn(
                'flex shrink grow flex-col',
                'peer-data-[state=collapsed]:max-w-[calc(100dvw-var(--app-size-width-sidebar-collapse))]',
                'peer-data-[state=expanded]:max-w-[calc(100dvw-var(--app-size-width-sidebar-expand))]'
            )}
        >
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
