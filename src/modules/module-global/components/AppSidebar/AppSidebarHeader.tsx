/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { SidebarTrigger, SidebarHeader } from '@module-base/components/sidebar';

export function AppSidebarHeader() {
    return (
        <SidebarHeader>
            <SidebarTrigger className="size-8 cursor-pointer" />
        </SidebarHeader>
    );
}
