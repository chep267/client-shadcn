/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/config';

/**
 * Đọc giá trị theo deep key dạng 'a.b.c' (hỗ trợ cả mảng index như 'a.0.b')
 * An toàn với object thiếu nhánh giữa đường (trả về undefined, không throw)
 */
export const getNestedValue = <Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    obj: Data,
    path?: App.ModuleBase.Component.BigdataKey<Data>
): unknown => {
    if (obj == null) return undefined;
    if (!path) return obj;
    if (!path.includes('.')) return (obj as Record<string, unknown>)[path];

    let current: unknown = obj;
    const keys = path.split('.');
    for (const key of keys) {
        if (current == null) return undefined;
        current = (current as Record<string, unknown>)[key];
    }
    return current;
};

/**
 * So sánh 2 giá trị theo kiểu phù hợp:
 * - null/undefined luôn bị đẩy xuống cuối (bất kể asc/desc) để không gây nhiễu loạn dữ liệu lớn
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
    orderType?: App.ModuleBase.Component.OrderType;
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
