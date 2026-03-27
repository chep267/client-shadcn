/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { HomeIcon, LayoutDashboardIcon } from 'lucide-react';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

const SidebarItems: App.ModuleGlobal.Component.SidebarItemProps['item'][] = [
    {
        path: AppRouterPath.dashboard,
        name: GlobalLanguage.component.label.dashboard,
        icon: LayoutDashboardIcon,
    },
    {
        path: AppRouterPath.feed,
        name: GlobalLanguage.component.label.feed,
        icon: HomeIcon,
    },
];

export { SidebarItems };
