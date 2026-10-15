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
import { useRouteMetadata } from '@modules/base/hooks/useRouteMetadata';

/** components */
import { StartLoading } from '@modules/base/components/start-loading';
import { SidebarProvider } from '@modules/base/components/sidebar';

/** lazy components */
const AppHeader = React.lazy(() => import('@modules/global/components/AppHeader'));
const AppSidebar = React.lazy(() => import('@modules/global/components/AppSidebar'));
const AppModal = React.lazy(() => import('@modules/global/components/AppModal'));
const AppSocket = React.lazy(() => import('@modules/global/components/AppSocket'));

export default function MainScreen() {
    const { hasHeader, hasSider } = useRouteMetadata();

    return (
        <div
            className={cn('relative', 'flex flex-col', 'h-dvh w-dvw', {
                '[--app-size-height-header:0px] [--app-size-height-screen:100dvh]': !hasHeader,
            })}
        >
            <React.Suspense fallback={<StartLoading />}>
                {hasHeader && <AppHeader />}

                <div className={cn('flex flex-1', 'pt-(--app-size-height-header)')}>
                    {hasSider ? (
                        <SidebarProvider className="min-h-(--app-size-height-screen)">
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
