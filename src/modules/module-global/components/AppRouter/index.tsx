/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/path';
import { CalendarRouterPath } from '@module-calendar/constants/path';
import { PoemRouterPath } from '@module-poem/constants/path';
import { MessengerRouterPath } from '@module-messenger/constants/path';
import { GlobalRouterPath } from '@module-global/constants/path';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { AppSidebarMini } from '@module-global/components/AppSidebarMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const CalendarRouter = React.lazy(() => import('@module-calendar/screens/CalendarRouter'));
const PoemRouter = React.lazy(() => import('@module-poem/screens/PoemRouter'));
const UserRouter = React.lazy(() => import('@module-user/screens/UserRouter'));
const MessengerRouter = React.lazy(() => import('@module-messenger/screens/MessengerRouter'));
const AgeCalculatorScreen = React.lazy(() => import('@module-global/screens/AgeCalculatorScreen'));

export function AppRouter() {
    const defaultPaths = React.useMemo(() => [...Object.values(AuthRouterPath), GlobalRouterPath.home], []);

    return (
        <main data-slot="sidebar-content" className={cn('flex flex-1 flex-col', 'min-w-0')}>
            <AppSidebarMini />
            <React.Suspense>
                <Routes>
                    {defaultPaths.map((path) => (
                        <Route key={path} path={path} element={<Navigate to={MessengerRouterPath.home} />} />
                    ))}
                    <Route path={MessengerRouterPath.root} element={<MessengerRouter />} />
                    <Route path={CalendarRouterPath.root} element={<CalendarRouter />} />
                    <Route path={PoemRouterPath.root} element={<PoemRouter />} />
                    <Route path={GlobalRouterPath.account} element={<UserRouter />} />
                    <Route path={GlobalRouterPath.ageCalculator} element={<AgeCalculatorScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </main>
    );
}
