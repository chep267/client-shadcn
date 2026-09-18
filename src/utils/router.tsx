/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import axios from 'axios';
import { createBrowserRouter, Navigate, replace } from 'react-router';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/path';
import { AccountState } from '@module-auth/constants/status';
import { CalendarRouterPath } from '@module-calendar/constants/path';
import { PoemRouterPath } from '@module-poem/constants/path';
import { MessengerRouterPath } from '@module-messenger/constants/path';
import { GlobalRouterPath } from '@module-global/constants/path';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

const authMiddleware = async ({ request }: { request: Request }) => {
    const {
        data: { user, token },
        action: authAction,
    } = useAuthStore.getState();
    const { action: settingAction } = useSettingStore.getState();

    const isAuthentication = !!user;
    const accountState = isAuthentication ? AccountState.verified : token ? AccountState.start : AccountState.signin;

    const url = new URL(request.url);
    const pathname = url.pathname;
    const currentPath = `${url.pathname}${url.search}${url.hash}`;
    const requireAuth = !Object.values<string>(AuthRouterPath).includes(pathname);

    switch (true) {
        case accountState === AccountState.signin: {
            /** not signed in => must be signin
             * pathname in auth routers && pathname !== start => not redirect
             */
            if (pathname !== AuthRouterPath.start && !requireAuth) return;

            /** pathname is other => save this url
             * redirect to signin */
            authAction.setData({ prePath: requireAuth ? currentPath : GlobalRouterPath.home });
            throw replace(AuthRouterPath.signin);
        }
        case accountState === AccountState.start: {
            /** has token => must be restart
             * if requireAuth => save this url, replace it after restart
             * pathname is "start" => not redirect
             * pathname is other => redirect to start
             */
            authAction.setData({ prePath: requireAuth ? currentPath : GlobalRouterPath.home });
            settingAction.updateStatusCode(axios.HttpStatusCode.Unauthorized);

            if (pathname === AuthRouterPath.start) return;
            throw replace(AuthRouterPath.start);
        }
        case accountState === AccountState.verified: {
            /** verified => ok
             * pathname in protected routers => nothing
             * pathname in auth routers => redirect to home
             */
            if (requireAuth) return;
            throw replace(GlobalRouterPath.home);
        }
        default: // nothing
    }
};

export const router = createBrowserRouter([
    {
        path: GlobalRouterPath.home,
        lazy: {
            Component: async () => (await import('@module-global/screens/MainScreen')).default,
            HydrateFallback: async () => (await import('@module-base/components/start-loading')).StartLoading,
        },
        children: [
            { index: true, element: <Navigate to={GlobalRouterPath.default} /> },

            /** ----------------------------------------------------------------------------------------------------- */
            /** auth routes */
            {
                path: AuthRouterPath.start,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-base/components/start-loading')).StartLoading,
                },
            },
            {
                path: AuthRouterPath.signin,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-auth/screens/AuthScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },
            {
                path: AuthRouterPath.register,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-auth/screens/AuthScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },
            {
                path: AuthRouterPath.recover,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-auth/screens/AuthScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },

            /** ----------------------------------------------------------------------------------------------------- */
            /** protected routes */
            {
                path: GlobalRouterPath.default,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-global/screens/FeedScreen')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: MessengerRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-messenger/screens/MessengerRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: CalendarRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-calendar/screens/CalendarRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: PoemRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-poem/screens/PoemRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: '*',
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@module-base/screens/NotFoundScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },
        ],
    },
]);
