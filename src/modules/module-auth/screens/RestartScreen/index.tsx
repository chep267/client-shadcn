/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart';

/** components */
import { StartLoading } from '@module-base/components/start-loading';

/** screens */

export default function RestartScreen() {
    const isCalled = React.useRef(false);
    const hookRestart = useRestart();

    React.useEffect(() => {
        if (!isCalled.current) {
            isCalled.current = true;
            hookRestart.mutate();
        }
    }, []);

    return <StartLoading />;
}
