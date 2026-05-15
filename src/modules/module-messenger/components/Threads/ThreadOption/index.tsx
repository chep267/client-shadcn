/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

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
    return (
        <DropdownMenu modal={false}>
            <div className={'opacity-0 group-hover/thread:opacity-100'}>
                <ButtonOption />
            </div>
            <React.Suspense fallback={null}>
                <MenuOption />
            </React.Suspense>
        </DropdownMenu>
    );
}
