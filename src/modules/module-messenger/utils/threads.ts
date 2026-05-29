/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const mapUidToTid = (uid: string = ''): string => {
    return uid.replace('uid', 'tid');
};

export const mapTidToUid = (tid: string = ''): string => {
    return tid.replace('tid', 'uid');
};

export const mapUserToThread = (
    user: App.ModuleUser.Data.TypeUser,
    meId: string = ''
): App.ModuleMessenger.Data.TypeThread => {
    return {
        tid: mapUidToTid(user.uid),
        name: user.name,
        avatar: user.photo,
        isGroup: true,
        uids: [user.uid, meId],
        unreadCounts: [],
        updatedAt: '',
    };
};
