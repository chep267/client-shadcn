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
interface SettingStoreData {
    locale: Locale;
    theme: Theme;
    api: {
        statusCode: number;
        queues: InternalAxiosRequestConfig[];
    };
}
interface SettingStoreAction {
    changeLocale: (locale?: Locale) => void;
    changeTheme: (theme?: Theme) => void;
    updateStatusCode: (code?: number) => void;
    addApiQueue: (apiConfig: InternalAxiosRequestConfig) => void;
    clearApiQueue: () => void;
}
export interface SettingStore {
    data: SettingStoreData;
    action: SettingStoreAction;
}
