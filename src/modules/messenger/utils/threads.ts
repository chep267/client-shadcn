/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const mapUserToThread = (user: App.Module.User.Data.User): App.Module.Messenger.Data.Thread => ({
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
