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

/** providers */
import AuthProvider from '@module-auth/providers/AuthProvider';

/** lazy components */
const AppSidebar = React.lazy(() =>
    import('@module-global/components/AppSidebar').then((module) => ({ default: module.AppSidebar }))
);
const MainRoute = React.lazy(() =>
    import('@module-global/components/AppMain/MainRoute').then((module) => ({ default: module.MainRoute }))
);

export function AppMain() {
    return (
        <div className={cn('flex flex-1', 'pt-(--app-size-height-header)')}>
            <React.Suspense fallback={<StartLoading />}>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <AuthProvider>
                                <SidebarProvider className="min-h-(--app-size-height-sidebar)">
                                    <AppSidebar />
                                    <MainRoute />
                                </SidebarProvider>
                            </AuthProvider>
                        }
                    />
                </Routes>
            </React.Suspense>
        </div>
    );
}
