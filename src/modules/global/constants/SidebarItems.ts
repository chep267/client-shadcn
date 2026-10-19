/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { LayoutDashboardIcon, CalendarIcon, CalculatorIcon, SendIcon, NotebookIcon } from 'lucide-react';

/** constants */
import { CalendarRouterPath } from '@modules/calendar/constants/path';
import { CalendarLanguage } from '@modules/calendar/constants/language';
import { PoemRouterPath } from '@modules/poem/constants/path';
import { PoemLanguage } from '@modules/poem/constants/language';
import { MessengerRouterPath } from '@modules/messenger/constants/path';
import { MessengerLanguage } from '@modules/messenger/constants/language';
import { FeedLanguage } from '@modules/feed/constants/language';
import { FeedRouterPath } from '@modules/feed/constants/path';
import { GlobalLanguage } from '@modules/global/constants/language';
import { GlobalRouterPath } from '@modules/global/constants/path';

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
