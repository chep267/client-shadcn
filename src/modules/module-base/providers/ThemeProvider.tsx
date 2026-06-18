/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppTheme } from '@module-base/constants/config';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

export function ThemeProvider(props: React.PropsWithChildren) {
    const { children } = props;

    const theme = useSettingStore((store) => store.data.theme);

    React.useLayoutEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(...Object.values(AppTheme));
        root.classList.add(theme);
    }, [theme]);

    return children;
}
