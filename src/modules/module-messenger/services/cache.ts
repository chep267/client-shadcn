/**
 *
 * @author dongntd267@gmail.com
 *
 */

class ThreadsCacheManager {
    private cache = new Map<string, App.ModuleMessenger.Data.TypeThread>();

    private mapUidToTid = (uid: string = ''): string => {
        return uid.replace('uid', 'tid');
    };

    private mapUserToThread = (
        user: App.ModuleUser.Data.TypeUser,
        meId: string
    ): App.ModuleMessenger.Data.TypeThread => {
        return {
            tid: this.mapUidToTid(user.uid),
            name: user.name,
            avatar: user.photo || user.name,
            isGroup: true,
            uids: [user.uid, meId],
            unreadCounts: [],
            updatedAt: new Date().toISOString(),
        };
    };

    get = (tid: string = '') => {
        return this.cache.get(tid);
    };

    add = (user: App.ModuleUser.Data.TypeUser, meId: string): App.ModuleMessenger.Data.TypeThread => {
        const tid = this.mapUidToTid(user.uid);
        if (!this.cache.has(tid)) {
            this.cache.set(tid, this.mapUserToThread(user, meId));
        }
        return this.cache.get(tid)!;
    };

    remove = (tid: string = '') => {
        if (!tid) return;
        this.cache.delete(tid);
    };

    getAll = () => {
        return Array.from(this.cache.values());
    };

    getRecentThreads = () => {
        const threads = this.getAll();
        return threads.slice(-5).reverse();
    };
}

export const threadsCache = new ThreadsCacheManager();
