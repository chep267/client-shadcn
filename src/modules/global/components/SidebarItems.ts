/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { LayoutDashboardIcon, CalendarIcon, CalculatorIcon, SendIcon, NotebookIcon } from 'lucide-react';

/** constants */
import { CalendarRouterPath, CalendarLanguage } from '@modules/calendar/constants';
import { PoemRouterPath, PoemLanguage } from '@modules/poem/constants';
import { FeedRouterPath, FeedLanguage } from '@modules/feed/constants';
import { MessengerRouterPath, MessengerLanguage } from '@modules/messenger/constants';
import { GlobalRouterPath, GlobalLanguage } from '@modules/global/constants';

const SidebarItems: App.Module.Global.Component.SidebarItemProps['item'][] = [
    {
        path: FeedRouterPath.home,
        name: FeedLanguage.component.label.router,
        icon: LayoutDashboardIcon,
    },
    {
        path: MessengerRouterPath.home,
        name: MessengerLanguage.component.label.router,
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
