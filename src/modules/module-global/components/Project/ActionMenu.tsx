import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@module-base/components/dropdown-menu';
import { Button } from '@module-base/components/button';
import { MoreHorizontal } from 'lucide-react';
import type { TaskData } from '@module-global/services/project';

interface ActionMenuProps {
    item: TaskData;
    onEdit?(item: TaskData): void;
    onDelete?(item: TaskData): void;
}

export function ActionMenu(props: ActionMenuProps) {
    const { item, onEdit, onDelete } = props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="cursor-pointer">
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
