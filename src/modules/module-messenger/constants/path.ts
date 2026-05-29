/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const MessengerApiPath = {
    root: '/app',
    threads: '/threads',
    messages: '/threads/:tid/messages',
} as const;

export const MessengerRouterPath = {
    root: '/messenger/*',
    home: '/messenger',
    conversation: '/:tid',
} as const;
