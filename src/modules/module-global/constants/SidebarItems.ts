/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { CalendarIcon, HomeIcon, SendIcon } from 'lucide-react';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

const SidebarItems = [
    {
        path: AppRouterPath.feed,
        name: GlobalLanguage.component.label.feed,
        icon: HomeIcon,
    },
    {
        path: AppRouterPath.messenger,
        name: GlobalLanguage.component.label.messenger,
        icon: SendIcon,
    },
    {
        path: AppRouterPath.calendar,
        name: GlobalLanguage.component.label.calendar,
        icon: CalendarIcon,
    },
];

export { SidebarItems };
