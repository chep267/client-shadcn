/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/config';

/**
 * Đọc giá trị theo deep key dạng 'a.b.c' (hỗ trợ cả mảng index như 'a.0.b')
 */
type Split<S extends string, Sep extends string = '.'> = S extends `${infer Head}${Sep}${infer Rest}`
    ? [Head, ...Split<Rest, Sep>]
    : [S];

type GetByKeys<T, Keys extends readonly string[]> = Keys extends [
    infer First extends string,
    ...infer Rest extends string[],
]
    ? T extends Array<infer Item>
        ? Rest extends []
            ? Item | undefined
            : GetByKeys<Item, Rest> | undefined
        : First extends keyof T
          ? Rest extends []
              ? T[First]
              : GetByKeys<T[First], Rest>
          : undefined // key không tồn tại trên T -> undefined
    : T;

type GetNestedValueReturn<Data, Path> = Path extends undefined
    ? Data
    : Data extends Array<infer Item>
      ? Path extends number
          ? Item | undefined
          : unknown
      : Path extends string
        ? GetByKeys<Data, Split<Path>>
        : undefined;

export const getNestedValue = <
    Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata,
    Path extends App.ModuleBase.Component.BigdataKey<Data> | string | number | undefined = undefined,
>(
    data?: Data,
    path?: Path
): GetNestedValueReturn<Data, Path> => {
    if (!data) return undefined as GetNestedValueReturn<Data, Path>;
    if (!path) return data as GetNestedValueReturn<Data, Path>;

    // Chuẩn hóa path thành array các key
    let keys: Array<string | number>;

    if (Array.isArray(path)) {
        keys = path as Array<string | number>;
    } else if (typeof path === 'string') {
        // Hỗ trợ dot-notation: 'a.b.c' hoặc 'a[0].b'
        keys = path
            .replace(/\[(\d+)]/g, '.$1') // a[0] -> a.0
            .split('.')
            .filter((key) => key !== '');
    } else if (typeof path === 'number') {
        keys = [path];
    } else {
        return undefined as GetNestedValueReturn<Data, Path>;
    }

    // Duyệt qua từng key
    let current: unknown = data;

    for (const key of keys) {
        if (current === undefined || current === null) {
            return undefined as GetNestedValueReturn<Data, Path>;
        }

        if (typeof current !== 'object') {
            return undefined as GetNestedValueReturn<Data, Path>;
        } else if (key in current) {
            current = current[key as keyof typeof current];
        } else {
            return undefined as GetNestedValueReturn<Data, Path>;
        }
    }

    return current as GetNestedValueReturn<Data, Path>;
};

/**
 * So sánh 2 giá trị theo kiểu phù hợp:
 * - number: so sánh số học
 * - Date: so sánh theo timestamp
 * - string: localeCompare (đúng thứ tự tiếng Việt/Unicode)
 */
const compareValues = <Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    a: Data,
    b: Data
): number => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() - b.getTime();
    }

    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
};

export const sortBigdata = <Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(payload: {
    items?: Data[];
    orderType?: App.ModuleBase.Data.OrderType;
    orderBy?: App.ModuleBase.Component.BigdataKey<Data>;
}): Data[] => {
    const { items, orderType = OrderType.asc, orderBy } = payload;
    if (!items?.length) return [];
    if (!orderBy) return items;

    const multiplier = orderType === OrderType.asc ? 1 : -1;

    return items.toSorted((a, b) => {
        const valueA = getNestedValue(a, orderBy);
        const valueB = getNestedValue(b, orderBy);
        const aNil = valueA === null || valueA === undefined;
        const bNil = valueB === null || valueB === undefined;
        if (aNil && bNil) return 0;
        if (aNil) return 1;
        if (bNil) return -1;
        return compareValues(valueA, valueB) * multiplier;
    });
};
