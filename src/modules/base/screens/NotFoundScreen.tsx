/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { IconBase } from '@modules/base/components/icon-base';

/** screens */
import LayerScreen from '@modules/base/screens/LayerScreen';

export default function NotFoundScreen() {
    return (
        <LayerScreen>
            <IconBase name="not-found" className="h-full max-h-120 w-auto" />
        </LayerScreen>
    );
}
