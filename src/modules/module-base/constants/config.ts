/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const AppTimer = {
    timeoutApi: 0,
    pendingApi: 600,
    searching: 600,
    notifyDuration: 2000,
    countdownError: 99,
    restart: 15 * 60 * 1000,
    debounce: 1000,
    delay: 1000,
    delayTooltip: 300,
} as const;

export const AppLocale: Readonly<{ [Key in App.ModuleBase.Data.Locale]: Key }> = {
    vi: 'vi',
    en: 'en',
};

export const AppTheme: Readonly<{ [Key in App.ModuleBase.Data.Theme]: Key }> = {
    dark: 'dark',
    light: 'light',
};

export const OrderType: Readonly<{ [Key in App.ModuleBase.Component.OrderType]: Key }> = {
    asc: 'asc',
    desc: 'desc',
};
