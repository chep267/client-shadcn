/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

export function useConst<T = unknown>(factory: () => T): T {
    const ref = React.useRef<T | undefined>(undefined);

    if (ref.current === undefined) {
        ref.current = factory();
    }

    return ref.current;
}
