/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const UserApiPath = {
    root: '/app',
    create: '/create',
    users: '/users',
    user: '/users/:uid',
} as const;

export const UserRouterPath = {
    root: '/profile/*',
    profile: '/profile/:uid',
} as const;
