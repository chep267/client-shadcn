/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/config';

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

export const getValueByDataKey = <Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    item: Data,
    dataKey?: App.ModuleBase.Component.BigdataKey<Data>
): string => {
    if (isNull(item)) return '';
    if (typeof item !== 'object') return String(item).trim().normalize('NFC');
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
export const sortBigdata = <Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(payload: {
    items?: Data[];
    orderType?: App.ModuleBase.Component.OrderType;
    orderBy?: App.ModuleBase.Component.BigdataKey<Data>;
}): Array<Data> => {
    const { items, orderType = OrderType.asc, orderBy } = payload;
    if (!items?.length) return [];

    const multiplier = orderType === OrderType.asc ? 1 : -1;
    const isObjectArray = items.every((item) => typeof item === 'object' && item !== null);
    const metaCache = isObjectArray ? new WeakMap<any, SortMeta>() : new Map<any, SortMeta>();

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
