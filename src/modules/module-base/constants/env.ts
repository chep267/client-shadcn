/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const AppEnv = {
    appName: import.meta.env.VITE_APP_NAME,
    apiHost: import.meta.env.VITE_APP_API_HOST,
    appTheme: import.meta.env.VITE_APP_CLIENT_THEME,
    appLocale: import.meta.env.VITE_APP_CLIENT_LOCALE,
} as const;

export const AppKey = {
    email: 'chep_client_react_local_email',
    theme: 'chep_client_react_local_theme',
    locale: 'chep_client_react_local_locale',
    token: 'chep_client_react_local_token',
} as const;
