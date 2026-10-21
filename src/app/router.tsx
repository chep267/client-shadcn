/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import axios from 'axios';
import { createBrowserRouter, Navigate, replace } from 'react-router';

/** constants */
import { AuthRouterPath, AccountState } from '@modules/auth/constants';
import { CalendarRouterPath } from '@modules/calendar/constants/path';
import { PoemRouterPath } from '@modules/poem/constants/path';
import { MessengerRouterPath } from '@modules/messenger/constants/path';
import { FeedRouterPath } from '@modules/feed/constants/path';
import { GlobalRouterPath } from '@modules/global/constants/path';

/** stores */
import { useSettingStore } from '@modules/base/stores/useSettingStore';
import { useAuthStore } from '@modules/auth/stores/useAuthStore';
import { UserRouterPath } from '@modules/user/constants/path';

const authMiddleware = async ({ request }: { request: Request }) => {
    const {
        data: { user, token, prePath },
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
            authAction.setData({ prePath: requireAuth ? currentPath : GlobalRouterPath.default });
            throw replace(AuthRouterPath.signin);
        }
        case accountState === AccountState.start: {
            /** has token => must be restart
             * if requireAuth => save this url, replace it after restart
             * pathname is "start" => not redirect
             * pathname is other => redirect to start
             */
            if (pathname === AuthRouterPath.start) return;
            settingAction.updateStatusCode(axios.HttpStatusCode.Unauthorized);
            authAction.setData({ prePath: requireAuth ? currentPath : GlobalRouterPath.default });
            throw replace(AuthRouterPath.start);
        }
        case accountState === AccountState.verified: {
            /** verified => ok
             * pathname in protected routers => nothing
             * pathname in auth routers => redirect to home
             */
            if (requireAuth) return;
            throw replace(prePath);
        }
        default: // nothing
    }
};

export const router = createBrowserRouter([
    {
        path: GlobalRouterPath.home,
        lazy: {
            Component: async () => (await import('@modules/global/screens/MainScreen')).default,
            HydrateFallback: async () => (await import('@modules/base/components/start-loading')).default,
        },
        children: [
            { index: true, element: <Navigate to={GlobalRouterPath.default} /> },

            /** ----------------------------------------------------------------------------------------------------- */
            /** auth routes */
            {
                path: AuthRouterPath.start,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/base/components/start-loading')).default,
                },
            },
            {
                path: AuthRouterPath.signin,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/auth/screens/AuthScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },
            {
                path: AuthRouterPath.register,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/auth/screens/AuthScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },
            {
                path: AuthRouterPath.recover,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/auth/screens/AuthScreen')).default,
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
                    Component: async () => (await import('@modules/global/screens/Dashboard')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: UserRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/user/screens/UserRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: FeedRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/feed/screens/FeedRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: MessengerRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/messenger/screens/MessengerRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: CalendarRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/calendar/screens/CalendarRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: PoemRouterPath.root,
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/poem/screens/PoemRouter')).default,
                },
                handle: {
                    includes: ['header', 'sider'],
                },
            },
            {
                path: '*',
                middleware: [authMiddleware],
                lazy: {
                    Component: async () => (await import('@modules/base/screens/NotFoundScreen')).default,
                },
                handle: {
                    includes: ['header'],
                },
            },
        ],
    },
]);
