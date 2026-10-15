/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const AuthApiPath = {
    root: '/auth',
    socket: '/socket',
    signin: '/signin',
    signout: '/signout',
    restart: '/restart',
    register: '/register',
    recover: '/recover',
} as const;

export const AuthRouterPath = {
    start: '/start',
    signin: '/signin',
    register: '/register',
    recover: '/recover',
} as const;
