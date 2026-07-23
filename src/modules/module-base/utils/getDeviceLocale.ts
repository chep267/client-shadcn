/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';

/** constants */
import { AppEnv, AppKey } from '@module-base/constants/env';
import { AppLocale } from '@module-base/constants/config';

export const getDeviceLocale = (): App.ModuleBase.Data.Locale => {
    // get from cookie
    let locale = Cookies.get(AppKey.locale) as App.ModuleBase.Data.Locale;
    if (locale in AppLocale) {
        return locale;
    }
    // get from env
    locale = AppEnv.appLocale;
    if (locale in AppLocale) {
        return locale;
    }
    // get from the device
    const deviceLocale =
        navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    // vi_VN | en_UK | en_US | ...
    locale = deviceLocale.slice(0, 2) as App.ModuleBase.Data.Locale;
    if (locale in AppLocale) {
        return locale;
    }
    // default
    return AppLocale.en;
};
