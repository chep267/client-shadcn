/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { Outlet } from 'react-router';

/** hooks */
import { useRouteMetadata } from '@module-base/hooks/useRouteMetadata';

/** components */
import { StartLoading } from '@module-base/components/start-loading';
import { SidebarProvider } from '@module-base/components/sidebar';

/** lazy components */
const AppHeader = React.lazy(() => import('@module-global/components/AppHeader'));
const AppSidebar = React.lazy(() => import('@module-global/components/AppSidebar'));
const AppModal = React.lazy(() => import('@module-global/components/AppModal'));
const AppSocket = React.lazy(() => import('@module-global/components/AppSocket'));

export default function MainScreen() {
    const { hasHeader, hasSider } = useRouteMetadata();

    return (
        <div
            className={cn('relative', 'flex flex-col', 'h-dvh w-dvw', { '[--app-size-height-header:0px]': !hasHeader })}
        >
            <React.Suspense fallback={<StartLoading />}>
                {hasHeader && <AppHeader />}

                <div className={cn('flex flex-1', 'pt-(--app-size-height-header)')}>
                    {hasSider ? (
                        <SidebarProvider className="min-h-[calc(100dvh-var(--app-size-height-header))]">
                            <AppSidebar />
                            <Outlet />
                        </SidebarProvider>
                    ) : (
                        <Outlet />
                    )}
                </div>

                <AppSocket />
                <AppModal />
            </React.Suspense>
        </div>
    );
}
