/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppLocale } from '@module-base/constants/config';

type MessageModule = Record<App.ModuleBase.Data.Locale, App.ModuleBase.Data.LanguageMessages>;

const localeLoaders = import.meta.glob<MessageModule>('/src/langs/*.ts', { eager: false });

const messagesCache = {} as MessageModule;

const pendingPromises = {} as Record<
    App.ModuleBase.Data.Locale,
    Promise<App.ModuleBase.Data.LanguageMessages> | undefined
>;

export async function getMessage(locale: App.ModuleBase.Data.Locale): Promise<App.ModuleBase.Data.LanguageMessages> {
    if (messagesCache[locale]) {
        return messagesCache[locale];
    }

    if (pendingPromises[locale]) {
        return pendingPromises[locale];
    }

    const defaultLocale = AppLocale.en;
    const loaderPath = `/src/langs/${locale}.ts`;
    const loader = localeLoaders[loaderPath];

    if (!loader) {
        if (locale === defaultLocale) {
            throw new Error('Default locale is missing');
        }
        console.warn(`Loader not found for locale: "${locale}". Falling back to "${defaultLocale}".`);
        return getMessage(defaultLocale);
    }

    pendingPromises[locale] = loader()
        .then((messages) => {
            if (messages?.[locale]) {
                messagesCache[locale] = messages[locale];
                return messages[locale];
            }
            return getMessage(defaultLocale);
        })
        .catch((error) => {
            console.error(`Failed to load locale ${locale} due to network or file error:`, error);
            return getMessage(defaultLocale);
        })
        .finally(() => {
            delete pendingPromises[locale];
        });

    return pendingPromises[locale];
}
