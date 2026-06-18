/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

/** constants */
import { AppLocale } from '@module-base/constants/config';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** utils */
import { getMessage } from '@module-base/utils/getMessage';

export function LanguageProvider(props: React.PropsWithChildren) {
    const { children } = props;

    const locale = useSettingStore((store) => store.data.locale);
    const [messages, setMessages] = React.useState<App.ModuleBase.Data.LanguageMessages | null>(null);

    React.useEffect(() => {
        dayjs.locale(locale);
        getMessage(locale).then(setMessages);
    }, [locale]);

    if (!messages) {
        return null;
    }

    return (
        <IntlProvider defaultLocale={AppLocale.en} locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
}
