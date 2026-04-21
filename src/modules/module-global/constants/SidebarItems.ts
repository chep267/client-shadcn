/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { HomeIcon, LayoutDashboardIcon, CalendarIcon } from 'lucide-react';

/** constants */
import { DashboardRouterPath } from '@module-dashboard/constants/DashboardRouterPath';
import { DashboardLanguage } from '@module-dashboard/constants/DashboardLanguage';
import { CalendarRouterPath } from '@module-calendar/constants/CalendarRouterPath';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';
import { PoemRouterPath } from '@module-poem/constants/PoemRouterPath';
import { PoemLanguage } from '@module-poem/constants/PoemLanguage';
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

const SidebarItems: App.ModuleGlobal.Component.SidebarItemProps['item'][] = [
    {
        path: DashboardRouterPath.home,
        name: DashboardLanguage.component.label.router,
        icon: LayoutDashboardIcon,
    },
    {
        path: GlobalRouterPath.feed,
        name: GlobalLanguage.component.label.feed,
        icon: HomeIcon,
    },
    {
        path: CalendarRouterPath.home,
        name: CalendarLanguage.component.label.router,
        icon: CalendarIcon,
    },
    {
        path: PoemRouterPath.home,
        name: PoemLanguage.component.label.router,
        icon: CalendarIcon,
    },
];

export { SidebarItems };
