/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import { Toaster } from '@module-base/components/sonner';

export default function NotifyBoundary() {
    const theme = useSettingStore(({ data }) => data.theme);

    return (
        <Toaster
            position="top-right"
            duration={AppTimer.notifyDuration}
            theme={theme}
            offset={{ top: `calc(var(--app-size-height-header) + var(--spacing) * 3)` }}
            mobileOffset={{ top: `calc(var(--app-size-height-header) + var(--spacing) * 3)` }}
        />
    );
}
