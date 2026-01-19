/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useLocation } from 'react-router-dom';

/** constants */
import { SidebarItems } from '@module-global/constants/SidebarItems';

/** components */
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '@module-base/components/sidebar';
import AppSidebarItem from '@module-global/components/AppSidebar/AppSidebarContent/AppSidebarItem';

export default function AppSidebarContent() {
    const { pathname } = useLocation();

    return (
        <SidebarContent className="scrollbar-custom scrollbar-thin overscroll-none">
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {SidebarItems.map((item) => (
                            <AppSidebarItem key={item.path} item={item} active={item.path === pathname} />
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
