/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const isNull = (v: any): v is null | undefined => v === null || v === undefined;

export const isEmptyString = (v: string): boolean => v === '';

export const isNumber = (v: string | number): boolean => !isEmptyString(`${v}`) && !Number.isNaN(Number(v));

export const deepGet = (obj: any, path: string, defaultValue: any = undefined) => {
    if (!obj || !path) return defaultValue;

    const paths = path.replace(/\[(\d+)]/g, '.$1').split('.');

    let result = obj;
    for (const key of paths) {
        result = result?.[key];
        if (result === undefined) return defaultValue;
    }

    return result ?? defaultValue;
};
