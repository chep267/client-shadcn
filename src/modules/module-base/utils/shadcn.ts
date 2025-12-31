/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getCssVariable = (name: string) => {
    if (typeof window === 'undefined') return undefined;
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!value) return undefined;
    if (value.endsWith('rem')) return parseFloat(value) * 16;
    return parseFloat(value);
};
