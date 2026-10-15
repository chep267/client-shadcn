/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { Sidebar, SidebarRail } from '@modules/base/components/sidebar';
import { AppSidebarHeader } from '@modules/global/components/AppSidebar/AppSidebarHeader';
import { AppSidebarContent } from '@modules/global/components/AppSidebar/AppSidebarContent';
import { AppSidebarFooter } from '@modules/global/components/AppSidebar/AppSidebarFooter';

export default function AppSidebar() {
    return (
        <Sidebar
            className={cn('top-(--app-size-height-header) h-[calc(100%-(--app-size-height-header))]')}
            collapsible="icon"
        >
            <SidebarRail />
            <AppSidebarHeader />
            <AppSidebarContent />
            <AppSidebarFooter />
        </Sidebar>
    );
}
