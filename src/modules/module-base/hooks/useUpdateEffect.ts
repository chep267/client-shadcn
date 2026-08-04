/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

export function useUpdateEffect(effect: React.EffectCallback, dependencies?: React.DependencyList) {
    const mounted = React.useRef(false);

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        return effect();
    }, dependencies);
}
