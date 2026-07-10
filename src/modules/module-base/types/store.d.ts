/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { InternalAxiosRequestConfig } from 'axios';
import type { Locale, Theme } from '@module-base/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** setting store */
type SettingStoreData = {
    locale: Locale;
    theme: Theme;
    api: {
        statusCode: number;
        queues: InternalAxiosRequestConfig[];
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
