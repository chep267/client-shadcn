/**
 *
 * @author dongntd267@gmail.com
 *
 */

export class CacheService<Data = unknown> {
    protected readonly cache = new Map<string, Data>();

    public get = (id: string = '') => {
        return this.cache.get(id);
    };

    public add = (id: string, data: Data): void => {
        this.cache.set(id, data);
    };

    public remove = (id: string = '') => {
        this.cache.delete(id);
    };

    public getKeys = () => {
        return Array.from(this.cache.keys());
    };

    public getValues = () => {
        return Array.from(this.cache.values());
    };
}
