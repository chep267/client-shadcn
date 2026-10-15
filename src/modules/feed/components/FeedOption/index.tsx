/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { DropdownMenu } from '@modules/base/components/dropdown-menu';
import { ButtonOption } from '@modules/feed/components/FeedOption/ButtonOption';

/** lazy components */
const MenuOption = React.lazy(() => import('@modules/feed/components/FeedOption/MenuOption'));

export function FeedOption() {
    return (
        <DropdownMenu modal={false}>
            <ButtonOption />
            <React.Suspense fallback={null}>
                <MenuOption />
            </React.Suspense>
        </DropdownMenu>
    );
}
