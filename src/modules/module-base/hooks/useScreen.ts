/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { getCssVariable } from '@module-base/utils/shadcn';

export function useScreen() {
    const mediaDevices = React.useRef<Record<'mobile' | 'tablet' | 'laptop', MediaQueryList | null>>({
        mobile: null,
        tablet: null,
        laptop: null,
    });

    const [query, setQuery] = React.useState({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
    });

    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        const MOBILE_BREAKPOINT = getCssVariable('--breakpoint-mobile', 640);
        const TABLET_BREAKPOINT = getCssVariable('--breakpoint-tablet', 768);
        const LAPTOP_BREAKPOINT = getCssVariable('--breakpoint-laptop', 1024);

        mediaDevices.current.mobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        mediaDevices.current.tablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
        mediaDevices.current.laptop = window.matchMedia(`(max-width: ${LAPTOP_BREAKPOINT - 1}px)`);

        const updateMatches = () => {
            const isMobile = !!mediaDevices.current.mobile?.matches;
            const isTablet = !!mediaDevices.current.tablet?.matches;
            const isLaptop = !!mediaDevices.current.laptop?.matches;

            setQuery({
                isMobile, // < mobile
                isTablet: !isMobile && isTablet, // mobile <= screen < tablet
                isLaptop: !isTablet && isLaptop, // tablet <= screen < laptop
                isDesktop: !isLaptop, // >= laptop
            });
        };

        updateMatches();
        Object.values(mediaDevices.current).forEach((media) => {
            media?.addEventListener('change', updateMatches);
        });

        return () => {
            Object.values(mediaDevices.current).forEach((media) => {
                media?.removeEventListener('change', updateMatches);
            });
        };
    }, []);

    return query;
}
