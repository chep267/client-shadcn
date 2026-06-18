/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';

/** constants */
import { AppEnv, AppKey } from '@module-base/constants/env';
import { AppTheme } from '@module-base/constants/config';

export const getDeviceTheme = (): App.ModuleBase.Data.Theme => {
    // get from cookie
    let theme = Cookies.get(AppKey.theme) as App.ModuleBase.Data.Theme;
    if (theme in AppTheme) {
        return theme;
    }
    // get from env
    theme = AppEnv.appTheme;
    if (theme in AppTheme) {
        return theme;
    }
    // get from the device
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return AppTheme.dark;
    }
    // default
    return AppTheme.light;
};
