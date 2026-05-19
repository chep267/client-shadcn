/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { EllipsisIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';
import { DropdownMenuTrigger } from '@module-base/components/dropdown-menu';

export function ButtonOption() {
    return (
        <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                className={cn(
                    'h-8 w-8',
                    'cursor-pointer rounded-full bg-inherit text-inherit shadow-none',
                    'focus-visible:ring-0',
                    'hover:border hover:text-inherit'
                )}
                aria-label="thread-setting"
            >
                <EllipsisIcon />
            </Button>
        </DropdownMenuTrigger>
    );
}
