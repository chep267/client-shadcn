/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** utils */
import { getDeviceLanguage } from '@module-base/utils/getDeviceLanguage';
import { getDeviceTheme } from '@module-base/utils/getDeviceTheme';

const defaultSettingStore: Readonly<App.ModuleBase.Store.TypeSettingStore['data']> = {
    isTokenExpired: false,
    locale: getDeviceLanguage(),
    theme: getDeviceTheme(),
};

export const useSettingStore = create<App.ModuleBase.Store.TypeSettingStore>((set) => ({
    data: structuredClone(defaultSettingStore),
    action: {
        setTokenExpired: (isTokenExpired = false) => {
            set(
                produce<App.ModuleBase.Store.TypeSettingStore>((store) => {
                    store.data.isTokenExpired = isTokenExpired;
                })
            );
        },
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
    },
}));
