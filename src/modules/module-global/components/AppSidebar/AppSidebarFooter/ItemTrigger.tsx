/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ChevronUpIcon } from 'lucide-react';

/** components */
import { SidebarMenuButton } from '@module-base/components/sidebar';
import { DropdownMenuTrigger } from '@module-base/components/dropdown-menu';
import { MyAvatar } from '@module-user/components/MyAvatar';
import { MyName } from '@module-user/components/MyName';

export function ItemTrigger() {
    return (
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton
                className="cursor-pointer group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-0!"
                size="lg"
            >
                <MyAvatar className="border" />
                <MyName className="text-sm" />
                <ChevronUpIcon className="ml-auto" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
    );
}
