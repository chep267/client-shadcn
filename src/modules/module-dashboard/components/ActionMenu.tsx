import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@module-base/components/dropdown-menu';
import { Button } from '@module-base/components/button';
import { MoreHorizontal } from 'lucide-react';

interface ActionMenuProps<Data> {
    item: Data;
    onEdit?(item: Data): void;
    onDelete?(item: Data): void;
}

export function ActionMenu<Data extends App.ModuleBase.Component.TypeTableData>(props: ActionMenuProps<Data>) {
    const { item, onEdit, onDelete } = props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label="table-row-action" size="icon" variant="ghost" className="cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit?.(item)}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={() => onDelete?.(item)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
