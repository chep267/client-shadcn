/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ChevronUpIcon } from 'lucide-react';

/** stores */
import { useAuthStore } from '@modules/auth/stores/useAuthStore';

/** components */
import { SidebarMenuButton } from '@modules/base/components/sidebar';
import { DropdownMenuTrigger } from '@modules/base/components/dropdown-menu';
import { UserInfo } from '@modules/user/components/UserInfo';

export function ItemTrigger() {
    const meId = useAuthStore((store) => store.data.user?.id);

    return (
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton
                className="cursor-pointer group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-0!"
                size="lg"
            >
                <UserInfo id={meId} />
                <ChevronUpIcon className="ml-auto" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
    );
}
