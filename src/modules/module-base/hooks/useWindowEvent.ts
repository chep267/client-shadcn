/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

export function useWindowEvent(event: string, handler: EventListener) {
    const onEvent = React.useEffectEvent(handler);

    React.useEffect(() => {
        window.addEventListener(event, onEvent);
        return () => window.removeEventListener(event, onEvent);
    }, [event]);
}
