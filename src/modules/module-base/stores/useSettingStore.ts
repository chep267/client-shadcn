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
import { AppKey } from '@module-base/constants/env';

/** utils */
import { getDeviceLocale } from '@module-base/utils/getDeviceLocale';
import { getDeviceTheme } from '@module-base/utils/getDeviceTheme';
import { registerStore } from '@module-base/utils/store';

const defaultData: Readonly<App.ModuleBase.Store.SettingStore['data']> = {
    locale: getDeviceLocale(),
    theme: getDeviceTheme(),
    api: {
        statusCode: axios.HttpStatusCode.Ok,
        queues: [],
    },
};

export const useSettingStore = create<App.ModuleBase.Store.SettingStore>((set) => {
    registerStore(() => {
        set(
            produce<App.ModuleBase.Store.SettingStore>((store) => {
                store.data = {
                    ...structuredClone(defaultData),
                    locale: store.data.locale,
                    theme: store.data.theme,
                };
            })
        );
    });

    return {
        data: structuredClone(defaultData),
        action: {
            changeLocale: (locale = defaultData.locale) => {
                Cookies.set(AppKey.locale, locale);
                set(
                    produce<App.ModuleBase.Store.SettingStore>((store) => {
                        store.data.locale = locale;
                    })
                );
            },
            changeTheme: (theme = defaultData.theme) => {
                Cookies.set(AppKey.theme, theme);
                set(
                    produce<App.ModuleBase.Store.SettingStore>((store) => {
                        store.data.theme = theme;
                    })
                );
            },
            updateStatusCode: (code = axios.HttpStatusCode.Ok) => {
                set(
                    produce<App.ModuleBase.Store.SettingStore>((store) => {
                        store.data.api.statusCode = code;
                    })
                );
            },
            addApiQueue: (apiConfig: App.ModuleBase.Store.SettingStore['data']['api']['queues'][number]) => {
                set(
                    produce<App.ModuleBase.Store.SettingStore>((store) => {
                        store.data.api.queues.push(apiConfig);
                    })
                );
            },
            clearApiQueue: () => {
                set(
                    produce<App.ModuleBase.Store.SettingStore>((store) => {
                        store.data.api.queues = [];
                    })
                );
            },
        },
    };
});
