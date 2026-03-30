/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { StartLoading } from '@module-base/components/start-loading';
import { SidebarProvider } from '@module-base/components/sidebar';

/** lazy components */
const AppSidebar = React.lazy(() => import('@module-global/components/AppSidebar'));
const MainRoute = React.lazy(() => import('@module-global/components/AppMain/MainRoute'));
// const AuthRoute = React.lazy(() => import('@module-auth/screens/AuthRoute'));

export default function AppMain() {
    return (
        <div className={cn('flex flex-1', 'pt-(--app-size-height-header)')}>
            <React.Suspense fallback={<StartLoading />}>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <>
                                <SidebarProvider className="min-h-(--app-size-height-sidebar)">
                                    <AppSidebar />
                                    <MainRoute />
                                </SidebarProvider>
                            </>
                        }
                    />
                </Routes>
            </React.Suspense>
        </div>
    );
}
