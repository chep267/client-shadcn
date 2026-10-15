/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@modules/base/constants/config';

/** stores */
import { useSettingStore } from '@modules/base/stores/useSettingStore';

/** components */
import { Toaster } from '@modules/base/components/sonner';

export function NotifyBoundary() {
    const theme = useSettingStore(({ data }) => data.theme);

    return (
        <Toaster
            position="top-right"
            duration={AppTimer.notifyDuration}
            theme={theme}
            offset={{ top: `calc(var(--app-size-height-header) + var(--spacing) * 3)` }}
            mobileOffset={{ top: `calc(var(--app-size-height-header) + var(--spacing) * 3)` }}
            richColors
        />
    );
}
