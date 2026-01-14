/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
export type TypeLocale = 'vi' | 'en';
export type TypeLanguageMessages = Record<string, string>;
export type TypeTheme = 'dark' | 'light' | 'system';
export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

/** Setting store */
type TypeSettingData = {
    locale: TypeLocale;
    theme: TypeTheme;
    sider: TypeSiderState;
};
type TypeSettingAction = {
    changeLocale: (locale?: TypeLocale) => void;
    changeTheme: (theme?: TypeTheme) => void;
    changeSider: (sider?: TypeSiderState) => void;
};
export type TypeSettingStore = {
    data: TypeSettingData;
    action: TypeSettingAction;
};
