/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const isNull = (v: any): v is null | undefined => v === null || v === undefined;

export const isEmptyString = (v: string): boolean => v === '';

export const isNumber = (v: string | number): boolean => !isEmptyString(`${v}`) && !Number.isNaN(Number(v));
