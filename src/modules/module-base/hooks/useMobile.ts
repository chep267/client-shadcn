/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { getCssVariable } from '@module-base/utils/shadcn';

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        const MOBILE_BREAKPOINT = getCssVariable('--breakpoint-tablet', 768);
        const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const listener = () => setIsMobile(media.matches);
        media.addEventListener('change', listener);

        setIsMobile(media.matches);
        return () => media.removeEventListener('change', listener);
    }, []);

    return isMobile;
}
