/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** utils */
import { isNull, isNumber, isEmptyString } from '@module-base/utils/data';

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
    return String(value).trim().normalize('NFC');
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

        if (isEmptyString(metaA.raw)) return 1;
        if (isEmptyString(metaB.raw)) return -1;

        if (isNumber(metaA.num) && isNumber(metaB.num)) {
            return (metaA.num - metaB.num) * multiplier;
        }

        if (metaA.extracted.length && metaB.extracted.length) {
            const len = Math.max(metaA.extracted.length, metaB.extracted.length);
            for (let i = 0; i < len; i++) {
                const aNum = metaA.extracted[i] ?? 0;
                const bNum = metaB.extracted[i] ?? 0;
                if (aNum !== bNum) return (aNum - bNum) * multiplier;
            }
        }

        return (
            metaA.raw.localeCompare(metaB.raw, undefined, {
                numeric: true,
            }) * multiplier
        );
    });
};
