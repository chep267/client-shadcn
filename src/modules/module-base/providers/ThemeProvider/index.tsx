/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { ThemeObject } from '@module-base/constants/ThemeObject';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

export default function ThemeProvider(props: React.PropsWithChildren) {
    const { children } = props;

    const theme = useSettingStore((store) => store.data.theme);

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(ThemeObject.light, ThemeObject.dark);

        if (theme !== ThemeObject.system) {
            return root.classList.add(theme);
        }

        const systemTheme = window.matchMedia(`(prefers-color-scheme: ${ThemeObject.dark})`).matches
            ? ThemeObject.dark
            : ThemeObject.light;
        root.classList.add(systemTheme);
    }, [theme]);

    return children;
}
