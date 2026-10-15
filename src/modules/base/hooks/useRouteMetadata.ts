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
    const routeViews = currentMatch.handle?.includes;

    return {
        hasHeader: routeViews?.includes('header'),
        hasFooter: routeViews?.includes('footer'),
        hasSider: routeViews?.includes('sider'),
    };
}
