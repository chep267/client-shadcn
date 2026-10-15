/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { InternalAxiosRequestConfig } from 'axios';
import type { Locale, Theme } from '@modules/base/types/data.d';

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

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** modal store */
export type TypeAttachment = {
    id: string;
    url?: string | null;
    type?: string | null;
    size?: number | null;
};
interface ModalStoreData {
    attachments: TypeAttachment[];
    position: number;
    open: boolean;
}
interface ModalStoreAction {
    show: (attachments?: ModalStoreData['attachments'], position?: number) => void;
    hide: () => void;
    changePosition: (mode: 'prev' | 'next') => void;
    setPosition: (position: number) => void;
}
export interface ModalStore {
    data: ModalStoreData;
    action: ModalStoreAction;
}
