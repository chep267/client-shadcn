/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Sidebar, SidebarRail } from '@module-base/components/sidebar';
import { AppSidebarHeader } from '@module-global/components/AppSidebar/AppSidebarHeader';
import { AppSidebarContent } from '@module-global/components/AppSidebar/AppSidebarContent';
import { AppSidebarFooter } from '@module-global/components/AppSidebar/AppSidebarFooter';

export function AppSidebar() {
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
