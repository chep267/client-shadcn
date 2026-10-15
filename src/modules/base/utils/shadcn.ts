/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const getCssVariable = (name: string, defaultValue = NaN) => {
    if (typeof window === 'undefined') return defaultValue;
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!value) return defaultValue;
    if (value.endsWith('rem')) return parseFloat(value) * 16;
    return parseFloat(value);
};
