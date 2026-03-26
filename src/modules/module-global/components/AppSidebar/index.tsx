/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { Sidebar, SidebarRail } from '@module-base/components/sidebar';
import AppSidebarHeader from '@module-global/components/AppSidebar/AppSidebarHeader';
import AppSidebarContent from '@module-global/components/AppSidebar/AppSidebarContent';
import AppSidebarFooter from '@module-global/components/AppSidebar/AppSidebarFooter';
import { cn } from '@module-base/utils/shadcn';

export default function AppSidebar() {
    return (
        <Sidebar
            className={cn('peer', 'top-(--app-size-height-header) h-[calc(100%-(--app-size-height-header))]')}
            collapsible="icon"
        >
            <SidebarRail />
            <AppSidebarHeader />
            <AppSidebarContent />
            <AppSidebarFooter />
        </Sidebar>
    );
}
