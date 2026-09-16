/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMatches, type UIMatch } from 'react-router';

export interface RouteHandle {
    title?: string;
    includes?: ('header' | 'footer' | 'sider')[];
}

export function useRouteMetadata() {
    const matches = useMatches();
    const currentMatch = matches[matches.length - 1] as UIMatch<unknown, RouteHandle>;

    return {
        hasHeader: currentMatch.handle?.includes?.includes('header'),
        hasFooter: currentMatch.handle?.includes?.includes('footer'),
        hasSider: currentMatch.handle?.includes?.includes('sider'),
    };
}
