/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
export type TypeLocale = 'vi' | 'en';
export type TypeLanguageMessages = Record<string, string>;
export type TypeTheme = 'dark' | 'light';
export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

/** Setting store */
type TypeSettingData = {
    isTokenExpired: boolean;
    locale: TypeLocale;
    theme: TypeTheme;
};
type TypeSettingAction = {
    changeLocale: (locale?: TypeLocale) => void;
    changeTheme: (theme?: TypeTheme) => void;
    setTokenExpired: (isTokenExpired: boolean) => void;
};
export type TypeSettingStore = {
    data: TypeSettingData;
    action: TypeSettingAction;
};
