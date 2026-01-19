/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

export function useLatest<T>(value: T) {
    const ref = React.useRef(value);
    React.useLayoutEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
}
