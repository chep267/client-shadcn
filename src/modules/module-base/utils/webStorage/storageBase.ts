/**
 *
 * @author dongntd267@gmail.com
 *
 */

export default class StorageBase {
    constructor(storageName: App.ModuleBase.Data.StorageName) {
        this.storageName = storageName;
        this.storageCache = new Map();
    }

    private readonly storageName: App.ModuleBase.Data.StorageName;
    private storageCache: Map<string, string | null>;

    private checkParams = (method: string, variable: any, name: string) => {
        if (!variable) {
            throw new Error(`${this.storageName} -- ${method} :: no ${name}!`);
        }
    };

    get = (key: string) => {
        this.checkParams('get', key, 'storage key');
        if (!this.storageCache.has(key)) {
            this.storageCache.set(key, window[this.storageName].getItem(key));
        }
        return this.storageCache.get(key);
    };
    getList = (keys: string[]) => {
        this.checkParams('getList', keys, 'array storage key');
        const results: Record<string, App.ModuleBase.Data.StorageValue> = {};
        for (const key of keys) {
            results[key] = this.get(key);
        }
        return results;
    };

    set = (key: string, data: App.ModuleBase.Data.StorageValue) => {
        this.checkParams('set', key, 'storage key');
        this.checkParams('set', data, 'data');
        const value = `${data || ''}`;
        window[this.storageName].setItem(key, value);
        this.storageCache.set(key, value);
    };
    setList = (keys: string[], data: App.ModuleBase.Data.StorageValue[]) => {
        this.checkParams('setList', keys, 'array storage key');
        this.checkParams('setList', data, 'array data');
        keys.forEach((key, index) => this.set(key, data[index]));
    };

    remove = (key: string) => {
        this.checkParams('remove', key, 'storage key');
        window[this.storageName].removeItem(key);
        this.storageCache.delete(key);
    };
    removeList = (keys: string[]) => {
        this.checkParams('removeList', keys, 'array storage key');
        keys.forEach(this.remove);
    };

    clearAll = () => {
        window[this.storageName].clear();
        this.storageCache.clear();
    };
    clearIgnoreKeys = (keys: string[]) => {
        this.checkParams('clearIgnoreKeys', keys, 'array storage key');
        const ignoreData = this.getList(keys);
        this.clearAll();
        this.setList(keys, Object.values(ignoreData));
    };
}
