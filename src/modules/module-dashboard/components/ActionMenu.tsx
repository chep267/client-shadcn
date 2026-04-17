/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { MoreHorizontal } from 'lucide-react';

/** stores */
import { useTicketStore } from '@module-dashboard/stores/useTicketStore';

/** components */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@module-base/components/dropdown-menu';
import { Button } from '@module-base/components/button';

interface ActionMenuProps {
    item: App.ModuleDashboard.Data.TypeTicketData;
}

export function ActionMenu(props: ActionMenuProps) {
    const { item } = props;
    const action = useTicketStore((store) => store.action);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label="table-row-action" size="icon" variant="ghost" className="cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => action.setData({ itemEdit: item })}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="danger cursor-pointer"
                    onClick={() => action.setData({ itemDelete: item })}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
