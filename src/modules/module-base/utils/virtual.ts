/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

const isNull = <T>(v: T | null | undefined): v is null | undefined => v === null || v === undefined;

export const sortTableData = <Data extends App.ModuleBase.Component.TableData>(payload: {
    items?: Data[];
    orderType?: App.ModuleBase.Component.OrderType;
    orderBy?: App.ModuleBase.Component.DataKey<Data>;
}): Array<Data> => {
    const { items, orderType = OrderType.asc, orderBy = 'id' } = payload;
    if (!items?.length) return [];

    const cache = new WeakMap<Data, ReturnType<typeof parseValue>>();

    const getCachedValue = (item: Data) => {
        if (!cache.has(item)) {
            cache.set(item, parseValue(item));
        }
        return cache.get(item)!;
    };

    const parseValue = (item: Data) => {
        const value = item?.[orderBy] as unknown;
        if (isNull(value)) return null;

        // ===== number =====
        if (typeof value === 'number') return value;

        // ===== string =====
        if (typeof value === 'string') {
            const trimmed = value.trim();

            // numeric string
            if (trimmed && !Number.isNaN(Number(trimmed))) {
                return Number(trimmed);
            }
            return trimmed;
        }

        return String(value);
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

        // ===== null =====
        if (isNull(valueA) && isNull(valueB)) return 0;
        if (isNull(valueA)) return 1;
        if (isNull(valueB)) return -1;

        // ===== number =====
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return orderType === OrderType.asc ? valueA - valueB : valueB - valueA;
        }

        const strA = String(valueA);
        const strB = String(valueB);
        const numsA = extractNumbers(strA);
        const numsB = extractNumbers(strB);

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
        const result = strA.localeCompare(strB, undefined, {
            numeric: true,
            sensitivity: 'base',
        });
        return orderType === OrderType.asc ? result : -result;
    });
};
