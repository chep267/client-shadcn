/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';
import Cookies from 'js-cookie';
import axios from 'axios';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** utils */
import { getDeviceLanguage } from '@module-base/utils/getDeviceLanguage';
import { getDeviceTheme } from '@module-base/utils/getDeviceTheme';

const defaultSettingStore: Readonly<App.ModuleBase.Store.TypeSettingStore['data']> = {
    locale: getDeviceLanguage(),
    theme: getDeviceTheme(),
    api: {
        statusCode: axios.HttpStatusCode.Ok,
        queue: [],
    },
};

export const useSettingStore = create<App.ModuleBase.Store.TypeSettingStore>((set) => ({
    data: structuredClone(defaultSettingStore),
    action: {
        changeLocale: (locale = defaultSettingStore.locale) => {
            Cookies.set(AppKey.locale, locale);
            set(
                produce<App.ModuleBase.Store.TypeSettingStore>((store) => {
                    store.data.locale = locale;
                })
            );
        },
        changeTheme: (theme = defaultSettingStore.theme) => {
            Cookies.set(AppKey.theme, theme);
            set(
                produce<App.ModuleBase.Store.TypeSettingStore>((store) => {
                    store.data.theme = theme;
                })
            );
        },
        updateStatusCode: (code = axios.HttpStatusCode.Ok) => {
            set(
                produce<App.ModuleBase.Store.TypeSettingStore>((store) => {
                    store.data.api.statusCode = code;
                })
            );
        },
        addApiQueue: (apiConfig: App.ModuleBase.Store.TypeSettingStore['data']['api']['queue'][number]) => {
            set(
                produce<App.ModuleBase.Store.TypeSettingStore>((store) => {
                    store.data.api.queue.push(apiConfig);
                })
            );
        },
        clearApiQueue: () => {
            set(
                produce<App.ModuleBase.Store.TypeSettingStore>((store) => {
                    store.data.api.queue = [];
                })
            );
        },
    },
}));
