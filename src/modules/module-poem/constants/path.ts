/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const PoemApiPath = {
    root: '/app',
    poems: '/poems',
} as const;

export const PoemRouterPath = {
    root: '/poems/*',
    home: '/poems',
    poem: '/poem/:id',
} as const;
