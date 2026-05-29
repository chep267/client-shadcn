/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** services */
import { threadsCache } from '@module-messenger/services/cache';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useCacheThreads() {
    const meId = useAuthStore((store) => store.data.user?.uid ?? '');

    return {
        get: threadsCache.get,
        getAll: threadsCache.getAll,
        add: (user: App.ModuleUser.Data.TypeUser) => threadsCache.add(user, meId),
        remove: threadsCache.remove,
        multiAdd: (users: App.ModuleUser.Data.TypeUser[] = []) => users.map((u) => threadsCache.add(u, meId)),
        multiRemove: (tids: string[]) => tids.forEach((tid) => threadsCache.remove(tid)),
        getRecentThreads: threadsCache.getRecentThreads,
    };
}
