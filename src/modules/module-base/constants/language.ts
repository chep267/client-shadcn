/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const BaseLanguage = {
    component: {
        label: {
            default: 'module.base.component.label.default',
            start: 'module.base.component.label.start',
            develop: 'module.base.component.label.develop',
            error: {
                fallback: {
                    title: 'module.base.component.label.error.fallback.title',
                    content: 'module.base.component.label.error.fallback.content',
                    autoReload: 'module.base.component.label.error.fallback.autoReload',
                },
                server: 'module.base.component.label.error.server.busy',
            },
            locale: {
                router: 'module.base.component.label.locale.router',
                vi: 'module.base.component.label.locale.vi',
                en: 'module.base.component.label.locale.en',
            },
            theme: {
                router: 'module.base.component.label.theme.router',
                dark: 'module.base.component.label.theme.dark',
                light: 'module.base.component.label.theme.light',
            },
        },
        input: {
            placeholder: 'module.base.component.input.placeholder',
        },
        button: {
            retry: 'module.base.component.button.retry',
            cancel: 'module.base.component.button.cancel',
            confirm: 'module.base.component.button.confirm',
            remove: 'module.base.component.button.remove',
            delete: 'module.base.component.button.delete',
            edit: 'module.base.component.button.edit',
        },
        table: {
            empty: 'module.base.component.table.empty',
        },
        select: {
            empty: 'module.base.component.select.empty',
            placeholder: 'module.base.component.select.placeholder',
            clear: 'module.base.component.select.clear',
        },
    },
} as const;
