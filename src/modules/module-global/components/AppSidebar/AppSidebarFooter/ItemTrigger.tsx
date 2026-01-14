/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ChevronUpIcon } from 'lucide-react';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { Avatar, AvatarFallback, AvatarImage } from '@module-base/components/avatar';
import { SidebarMenuButton } from '@module-base/components/sidebar';
import { DropdownMenuTrigger } from '@module-base/components/dropdown-menu';

export default function ItemTrigger() {
    const user = useAuthStore((store) => store.data.user);

    return (
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton
                className="cursor-pointer group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:!p-0"
                size="lg"
            >
                <Avatar className="border">
                    <AvatarImage src={user?.photo ?? undefined} />
                    <AvatarFallback className="text-xs">{user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                &nbsp;{user?.name}
                <ChevronUpIcon className="ml-auto" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
    );
}
