/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const FeedApiPath = {
    root: '/app',
    feeds: '/feeds',
    feed: '/feeds/:fid',
} as const;

export const FeedRouterPath = {
    root: '/feed/*',
    home: '/feed',
    feed: '/:fid',
} as const;
