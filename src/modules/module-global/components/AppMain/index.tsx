/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { Routes, Route } from 'react-router-dom';

/** components */
import StartLoading from '@module-base/components/StartLoading';
import { SidebarProvider } from '@module-base/components/sidebar';

/** lazy components */
const AppSidebar = React.lazy(() => import('@module-global/components/AppSidebar'));
const MainRoute = React.lazy(() => import('@module-global/components/AppMain/MainRoute'));
// const AuthRoute = React.lazy(() => import('@module-auth/screens/AuthRoute'));

export default function AppMain() {
    return (
        <main className={clsx('flex shrink grow', 'pt-(--app-size-height-header)')}>
            <React.Suspense fallback={<StartLoading />}>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <SidebarProvider className="min-h-(--app-size-height-sidebar)">
                                <AppSidebar />
                                <MainRoute />
                            </SidebarProvider>
                        }
                    />
                </Routes>
            </React.Suspense>
        </main>
    );
}
