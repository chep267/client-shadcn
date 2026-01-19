/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getCssVariable = (name: string, defaultValue: number = NaN) => {
    if (typeof window === 'undefined') return defaultValue;
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!value) return defaultValue;
    if (value.endsWith('rem')) return parseFloat(value) * 16;
    return parseFloat(value);
};
