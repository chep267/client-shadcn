/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { getCssVariable } from '@module-base/utils/shadcn';

type Direction = 'up' | 'down';

export function useMediaQuery(cssVar: string, direction: Direction = 'up') {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        const value = getCssVariable(cssVar);
        if (!value) return;

        const query = direction === 'up' ? `(min-width: ${value}px)` : `(max-width: ${value - 0.05}px)`;

        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);
        setMatches(media.matches);

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [cssVar, direction]);

    return matches;
}
