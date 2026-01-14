/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@module-base/components/sidebar';
import { DropdownMenu, DropdownMenuContent } from '@module-base/components/dropdown-menu';
import ItemTrigger from '@module-global/components/AppSidebar/AppSidebarFooter/ItemTrigger';
import ItemSignout from '@module-global/components/AppSidebar/AppSidebarFooter/ItemSignout';
import ItemAccount from '@module-global/components/AppSidebar/AppSidebarFooter/ItemAccount';

export default function Index() {
    const user = useAuthStore((store) => store.data.user);
    const isAuthentication = !!user;

    if (!isAuthentication) return null;

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu modal={false}>
                        <ItemTrigger />
                        <DropdownMenuContent side="top" align="start">
                            <ItemAccount />
                            <ItemSignout />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
