/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** stores */
import { useAuthStore } from '@modules/auth/stores/useAuthStore';

/** components */
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@modules/base/components/sidebar';
import { DropdownMenu, DropdownMenuContent } from '@modules/base/components/dropdown-menu';
import { ItemTrigger } from '@modules/global/components/AppSidebar/AppSidebarFooter/ItemTrigger';
import { ItemSignout } from '@modules/global/components/AppSidebar/AppSidebarFooter/ItemSignout';
import { ItemAccount } from '@modules/global/components/AppSidebar/AppSidebarFooter/ItemAccount';

export function AppSidebarFooter() {
    const isAuthentication = useAuthStore((store) => !!store.data.user);

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
