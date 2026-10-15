/**
 *
 * @author dongntd267@gmail.com
 *
 */

export class CacheService<Data = unknown> {
    protected readonly cache = new Map<string, Data>();

    get = (id: string) => {
        if (!id) throw new Error('param "id" is required!');
        return this.cache.get(id);
    };

    add = (id: string, data: Data): void => {
        if (!id) throw new Error('param "id" is required!');
        if (!data) throw new Error('param "data" is required!');
        this.cache.set(id, data);
    };

    remove = (id: string) => {
        if (!id) throw new Error('param "id" is required!');
        return this.cache.delete(id);
    };

    getKeys = () => {
        return Array.from(this.cache.keys());
    };

    getValues = () => {
        return Array.from(this.cache.values());
    };
}
