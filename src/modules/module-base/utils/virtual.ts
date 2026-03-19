/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

export const sortTableData = <Data extends App.ModuleBase.Component.TableData>(payload: {
    items?: Data[];
    orderType?: App.ModuleBase.Component.OrderType;
    orderBy?: App.ModuleBase.Component.DataKey<Data>;
}): Array<Data> => {
    const { items, orderType = OrderType.asc, orderBy = 'id' } = payload;
    if (!items?.length) return [];

    const parseValue = (item: Data) => {
        const value = item[orderBy] as unknown;
        // number
        if (typeof value === 'number') return value;
        // string
        if (typeof value === 'string') {
            const trimmed = value.trim();
            // numeric string
            if (trimmed !== '' && !Number.isNaN(Number(trimmed))) {
                return Number(trimmed);
            }
            return trimmed;
        }
        return null;
    };

    return items.toSorted((a, b) => {
        const formattedA = parseValue(a);
        const formattedB = parseValue(b);

        // case string
        if (typeof formattedA === 'string' && typeof formattedB === 'string') {
            return orderType === OrderType.asc
                ? formattedA.localeCompare(formattedB, undefined, { numeric: true, sensitivity: 'base' })
                : formattedB.localeCompare(formattedA, undefined, { numeric: true, sensitivity: 'base' });
        }

        // case number
        if (typeof formattedA === 'number' && typeof formattedB === 'number') {
            return orderType === OrderType.asc ? formattedA - formattedB : formattedB - formattedA;
        }

        // case null | undefined
        if (!formattedA && !formattedB) return 0;
        if (formattedA == null) return 1;
        if (formattedB == null) return -1;
        return 0;
    });
};
