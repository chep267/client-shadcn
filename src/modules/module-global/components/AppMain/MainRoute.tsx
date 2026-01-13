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
const FeedScreen = React.lazy(() => import('@module-global/screens/FeedScreen'));

export default function MainRoute() {
    return (
        <div className="flex h-full w-full flex-col">
            <AppSidebarMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AppRouterPath.home} element={<Navigate to={AppRouterPath.defaultPath} />} />
                    <Route path={AppRouterPath.feed} element={<FeedScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </div>
    );
}
