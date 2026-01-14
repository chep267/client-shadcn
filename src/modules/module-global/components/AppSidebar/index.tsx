/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { Sidebar, SidebarRail } from '@module-base/components/sidebar';
import AppSidebarHeader from '@module-global/components/AppSidebar/AppSidebarHeader';
import Index from '@module-global/components/AppSidebar/AppSidebarFooter';
import AppSidebarContent from '@module-global/components/AppSidebar/AppSidebarContent';

export default function AppSidebar() {
    return (
        <Sidebar
            className="top-(--app-size-height-header) h-[calc(100%-(--app-size-height-header))]"
            collapsible="icon"
        >
            <SidebarRail />
            <AppSidebarHeader />
            <AppSidebarContent />
            <Index />
        </Sidebar>
    );
}
