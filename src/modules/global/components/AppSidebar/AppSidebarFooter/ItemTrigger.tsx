/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { ChevronUpIcon } from 'lucide-react';

/** components */
import { SidebarMenuButton } from '@modules/base/components/sidebar';
import { DropdownMenuTrigger } from '@modules/base/components/dropdown-menu';
import { MyAvatar } from '@modules/user/components/MyAvatar';
import { MyName } from '@modules/user/components/MyName';

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
