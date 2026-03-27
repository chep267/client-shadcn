/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

export const isNull = (v: any): v is null | undefined => v === null || v === undefined;
export const isEmptyString = (v: string): boolean => v === '';
export const isNumber = (v: string | number): boolean => !isEmptyString(`${v}`) && !Number.isNaN(Number(v));

type PathKey = string | number;
const pathCache = new Map<string, PathKey[]>();
const parsePath = (path: string): PathKey[] => {
    if (pathCache.has(path)) return pathCache.get(path)!;
    const result: PathKey[] = [];
    const regex = /([^.[\]]+)|\[(\d+)]/g;
    let match: RegExpExecArray | null;
    while (!isNull((match = regex.exec(path)))) {
        result.push(match[2] !== undefined ? Number(match[2]) : match[1]);
    }
    pathCache.set(path, result);
    return result;
};

export const getValueByDataKey = <Data extends object>(item: Data, dataKey = ''): string => {
    if (!dataKey) return '';
    const path = parsePath(dataKey);
    let value: any = item;
    for (const key of path) {
        if (isNull(value)) return '';
        value = value[key];
    }
    if (isNull(value)) return '';
    if (value instanceof Date) return value.getTime().toString();
    return String(value).trim();
};

interface SortMeta {
    raw: string;
    num: number;
    extracted: number[];
}
export const sortTableData = <Data extends object>(payload: {
    items?: Data[];
    orderType?: App.ModuleBase.Component.OrderType;
    orderBy?: string;
}): Array<Data> => {
    const { items, orderType = OrderType.asc, orderBy = 'id' } = payload;
    if (!items?.length) return [];

    const multiplier = orderType === OrderType.asc ? 1 : -1;

    // Cache object chứa các thông số đã tính toán trước
    const metaCache = new WeakMap<Data, SortMeta>();

    const getMeta = (item: Data): SortMeta => {
        let meta = metaCache.get(item);
        if (!meta) {
            const raw = getValueByDataKey(item, orderBy);
            meta = {
                raw,
                num: Number(raw),
                extracted: isNumber(raw) ? [] : (raw.match(/\d+(\.\d+)?/g)?.map(Number) ?? []),
            };
            metaCache.set(item, meta);
        }
        return meta;
    };

    return items.toSorted((a, b) => {
        const metaA = getMeta(a);
        const metaB = getMeta(b);

        if (metaA.raw === metaB.raw) return 0;

        // Luôn đẩy rỗng xuống cuối (không nhân multiplier)
        if (isEmptyString(metaA.raw)) return 1;
        if (isEmptyString(metaB.raw)) return -1;

        // 1. So sánh số thuần túy (bao gồm cả timestamp của Date)
        if (isNumber(metaA.num) && isNumber(metaB.num)) {
            return (metaA.num - metaB.num) * multiplier;
        }

        // 2. So sánh mảng số bên trong chuỗi (ví dụ: "Ver 1.2" vs "Ver 1.10")
        if (metaA.extracted.length && metaB.extracted.length) {
            const len = Math.max(metaA.extracted.length, metaB.extracted.length);
            for (let i = 0; i < len; i++) {
                const aNum = metaA.extracted[i] ?? 0;
                const bNum = metaB.extracted[i] ?? 0;
                if (aNum !== bNum) return (aNum - bNum) * multiplier;
            }
        }

        // 3. Fallback so sánh chuỗi (Locale, numeric: true xử lý tốt "2" < "10")
        return (
            metaA.raw.localeCompare(metaB.raw, undefined, {
                numeric: true,
                sensitivity: 'base',
            }) * multiplier
        );
    });
};
