/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const normalizeString = (text: string = ''): string => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
};

export const deepIncludes = (data: any, normalizedQuery: string, searchableKeys?: string[]): boolean => {
    if (!normalizedQuery) return true;

    const keySet = searchableKeys ? new Set(searchableKeys) : undefined;
    const visited = new WeakSet();

    const isMatch = (currentData: any, isRoot: boolean): boolean => {
        if (currentData === null || currentData === undefined) return false;

        if (typeof currentData === 'string' || typeof currentData === 'number') {
            return normalizeString(String(currentData)).includes(normalizedQuery);
        }

        if (typeof currentData === 'object') {
            if (visited.has(currentData)) return false;
            visited.add(currentData);

            if (currentData instanceof Date) {
                return normalizeString(currentData.toISOString()).includes(normalizedQuery);
            }

            for (const key in currentData) {
                if (Object.prototype.hasOwnProperty.call(currentData, key)) {
                    if (isRoot && keySet && !keySet.has(key)) {
                        continue;
                    }
                    if (isMatch(currentData[key], false)) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    return isMatch(data, true);
};
