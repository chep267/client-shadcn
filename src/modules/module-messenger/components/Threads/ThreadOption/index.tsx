/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { DropdownMenu } from '@module-base/components/dropdown-menu';
import { ButtonOption } from '@module-messenger/components/Threads/ThreadOption/ButtonOption';

/** lazy components */
const MenuOption = React.lazy(() =>
    import('@module-messenger/components/Threads/ThreadOption/MenuOption').then((module) => ({
        default: module.MenuOption,
    }))
);

export function ThreadOption() {
    const [open, setOpen] = React.useState(false);

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
                <div className={cn('group-hover/thread:opacity-100', { 'opacity-0': !open })}>
                    <ButtonOption />
                </div>
                <React.Suspense fallback={null}>
                    <MenuOption />
                </React.Suspense>
            </DropdownMenu>
        </div>
    );
}
