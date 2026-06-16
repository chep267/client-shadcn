/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { InternalAxiosRequestConfig } from 'axios';
export type Locale = 'vi' | 'en';
export type LanguageMessages = Record<string, string>;
export type Theme = 'dark' | 'light';
export type SiderState = 'collapse' | 'expand' | 'hidden' | 'force';

/** Setting store */
type SettingStoreData = {
    locale: Locale;
    theme: Theme;
    api: {
        statusCode: number;
        queue: InternalAxiosRequestConfig[];
    };
};
type SettingStoreAction = {
    changeLocale: (locale?: Locale) => void;
    changeTheme: (theme?: Theme) => void;
    updateStatusCode: (code?: number) => void;
    addApiQueue: (apiConfig: InternalAxiosRequestConfig) => void;
    clearApiQueue: () => void;
};
export type SettingStore = {
    data: SettingStoreData;
    action: SettingStoreAction;
};
