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
const MenuOption = React.lazy(() => import('@module-messenger/components/Threads/ThreadOption/MenuOption'));

interface ThreadOptionProps {
    thread: App.ModuleMessenger.Data.Thread;
}

export function ThreadOption(props: ThreadOptionProps) {
    const { thread } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
                <div className={cn('group-hover/thread-item:opacity-100', { 'opacity-0': !open })}>
                    <ButtonOption />
                </div>
                <React.Suspense fallback={null}>
                    <MenuOption thread={thread} />
                </React.Suspense>
            </DropdownMenu>
        </div>
    );
}
