/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** components */
import { Toaster } from '@module-base/components/sonner';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

export default function NotifyBoundary() {
    const theme = useSettingStore(({ data }) => data.theme);

    return <Toaster position="top-right" duration={AppTimer.notifyDuration} theme={theme} />;
}
