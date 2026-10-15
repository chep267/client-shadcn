/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const mapUserToThread = (user: App.ModuleUser.Data.User): App.ModuleMessenger.Data.Thread => ({
    id: user.id,
    name: user.name,
    avatar: user.photo,
    unreads: [],
    uids: [user.id],
    metadata: {
        lastMessageId: '',
        isGroup: true,
    },
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
