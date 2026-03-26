/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

export const isNull = <T>(v: T | null | undefined): v is null | undefined => v === null || v === undefined;

export const getValueByDataKey = <Data extends App.ModuleBase.Component.TableData>(item: Data, dataKey?: string) => {
    if (!dataKey?.trim()) {
        throw new Error(`Invalid dataKey: ${dataKey}`);
    }
    let value = { ...item };
    const keys = dataKey.split('.');
    for (const key of keys) {
        try {
            value = value[key];
        } catch {
            throw new Error(`Invalid dataKey: ${dataKey}`);
        }
    }
    return String(value).trim();
};

export const sortTableData = <Data extends App.ModuleBase.Component.TableData>(payload: {
    items?: Data[];
    orderType?: App.ModuleBase.Component.OrderType;
    orderBy?: string;
}): Array<Data> => {
    const { items, orderType = OrderType.asc, orderBy = 'id' } = payload;
    if (!items?.length) return [];

    const cache = new WeakMap<Data, string>();

    const getCachedValue = (item: Data) => {
        if (!cache.has(item)) {
            cache.set(item, getValueByDataKey(item, orderBy));
        }
        return cache.get(item)!;
    };

    // ===== extract numbers (ignore '-') =====
    const extractNumbers = (str: string) => {
        return (
            str
                .replace(/-/g, ' ')
                .match(/\d+(\.\d+)?/g)
                ?.map(Number) ?? []
        );
    };

    return items.toSorted((a, b) => {
        const valueA = getCachedValue(a);
        const valueB = getCachedValue(b);
        const numsA = extractNumbers(valueA);
        const numsB = extractNumbers(valueB);

        // ===== compare by numbers inside string =====
        if (numsA.length && numsB.length) {
            for (let i = 0, n = Math.max(numsA.length, numsB.length); i < n; i++) {
                const diff = (numsA[i] ?? 0) - (numsB[i] ?? 0);
                if (diff !== 0) {
                    return orderType === OrderType.asc ? diff : -diff;
                }
            }
        }

        // ===== fallback string =====
        const result = valueA.localeCompare(valueB, undefined, {
            numeric: true,
            sensitivity: 'base',
        });
        return orderType === OrderType.asc ? result : -result;
    });
};
