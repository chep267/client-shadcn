/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { DropdownMenu } from '@modules/base/components/dropdown-menu';
import { ButtonSetting } from '@modules/global/components/AppHeader/AppSetting/ButtonSetting';

/** lazy components */
const MenuSetting = React.lazy(() => import('@modules/global/components/AppHeader/AppSetting/MenuSetting'));

export function AppSetting() {
    return (
        <DropdownMenu modal={false}>
            <ButtonSetting />
            <React.Suspense fallback={null}>
                <MenuSetting />
            </React.Suspense>
        </DropdownMenu>
    );
}
