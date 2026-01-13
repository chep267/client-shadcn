/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ChevronUpIcon, User2Icon } from 'lucide-react';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@module-base/components/sidebar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@module-base/components/dropdown-menu';

export default function AppSidebarFooter() {
    const user = useAuthStore((store) => store.data.user);
    const isAuthentication = !!user;

    if (!isAuthentication) return null;

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="cursor-pointer" size="lg">
                                <User2Icon />
                                &nbsp;{user.displayName}
                                <ChevronUpIcon className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top">
                            <DropdownMenuItem>
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
