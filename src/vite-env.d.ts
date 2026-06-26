/**
 *
 * @author dongntd267@gmail.com
 *
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_MODE: 'dev' | 'prod';
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_API_HOST: string;
    readonly VITE_APP_CLIENT_HOST: string;
    readonly VITE_APP_CLIENT_PORT: string;
    readonly VITE_APP_CLIENT_LOCALE: App.ModuleBase.Data.Locale;
    readonly VITE_APP_CLIENT_THEME: App.ModuleBase.Data.Theme;

    readonly VITE_APP_PUSHER_KEY: string;
    readonly VITE_APP_PUSHER_CLUSTER: string;
}

declare module '*.svg' {
    const ReactComponent: any;
    export const ReactComponent;
}

declare module '*.png' {
    const ReactComponent: any;
    export const ReactComponent;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
