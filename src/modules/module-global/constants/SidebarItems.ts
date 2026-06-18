/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { LayoutDashboardIcon, CalendarIcon, CalculatorIcon, SendIcon, NotebookIcon } from 'lucide-react';

/** constants */
import { CalendarRouterPath } from '@module-calendar/constants/path';
import { CalendarLanguage } from '@module-calendar/constants/language';
import { PoemRouterPath } from '@module-poem/constants/path';
import { PoemLanguage } from '@module-poem/constants/language';
import { MessengerRouterPath } from '@module-messenger/constants/path';
import { GlobalLanguage } from '@module-global/constants/language';
import { GlobalRouterPath } from '@module-global/constants/path';

const SidebarItems: App.ModuleGlobal.Component.SidebarItemProps['item'][] = [
    {
        path: GlobalRouterPath.feed,
        name: GlobalLanguage.component.label.feed,
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
        path: GlobalRouterPath.ageCalculator,
        name: GlobalLanguage.component.label.ageCalculator,
        icon: CalculatorIcon,
    },
];

export { SidebarItems };
