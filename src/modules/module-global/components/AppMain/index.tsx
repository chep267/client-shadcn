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

/** lazy components */
const AppSider = React.lazy(() => import('@module-global/components/AppSider'));
const MainRoute = React.lazy(() => import('@module-global/components/AppMain/MainRoute'));
const AuthRoute = React.lazy(() => import('@module-auth/screens/AuthRoute'));

export default function AppMain() {
    return (
        <main className={clsx('flex shrink grow', 'scrollbar-custom overflow-auto overscroll-auto')}>
            <div className="h-1000 w-full" />
        </main>

        // <Box component="main" className="flex shrink grow pt-(--app-size-height-header)">
        //     <Container id="app-container" className="flex h-full w-full max-w-full p-0">
        //         <React.Suspense fallback={<StartLoading />}>
        //             <Routes>
        //                 <Route
        //                     path="*"
        //                     element={
        //                         <AuthRoute>
        //                             <AppSider />
        //                             <MainRoute />
        //                         </AuthRoute>
        //                     }
        //                 />
        //             </Routes>
        //         </React.Suspense>
        //     </Container>
        // </Box>
    );
}
