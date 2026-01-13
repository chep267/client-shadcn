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
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    useSidebar,
} from '@module-base/components/sidebar';
import AppSidebarItem from '@module-global/components/AppSidebar/AppSidebarItem';

export default function AppSidebarContent() {
    const { pathname } = useLocation();
    const { open } = useSidebar();

    return (
        <SidebarContent className="scrollbar-custom scrollbar-thin overscroll-none">
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {SidebarItems.map((item) => (
                            <AppSidebarItem
                                key={item.path}
                                item={item}
                                active={item.path === pathname}
                                tooltip={!open}
                            />
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
