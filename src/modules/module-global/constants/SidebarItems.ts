/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { LayoutDashboardIcon, CalendarIcon, CalculatorIcon, SendIcon, NotebookIcon } from 'lucide-react';

/** constants */
import { DashboardRouterPath } from '@module-dashboard/constants/path';
import { DashboardLanguage } from '@module-dashboard/constants/language';
import { CalendarRouterPath } from '@module-calendar/constants/path';
import { CalendarLanguage } from '@module-calendar/constants/language';
import { PoemRouterPath } from '@module-poem/constants/path';
import { PoemLanguage } from '@module-poem/constants/language';
import { MessengerRouterPath } from '@module-messenger/constants/path';
import { GlobalLanguage } from '@module-global/constants/language';

const SidebarItems: App.ModuleGlobal.Component.SidebarItemProps['item'][] = [
    {
        path: DashboardRouterPath.home,
        name: DashboardLanguage.component.label.router,
        icon: LayoutDashboardIcon,
    },
    {
        path: MessengerRouterPath.home,
        name: GlobalLanguage.component.label.messenger,
        icon: SendIcon,
    },
    {
        path: CalendarRouterPath.home,
        name: CalendarLanguage.component.label.router,
        icon: CalendarIcon,
    },
    {
        path: PoemRouterPath.home,
        name: PoemLanguage.component.label.router,
        icon: NotebookIcon,
    },
    {
        path: DashboardRouterPath.root.replace('/*', DashboardRouterPath.ageCalculator),
        name: GlobalLanguage.component.label.ageCalculator,
        icon: CalculatorIcon,
    },
];

export { SidebarItems };
