/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { DropdownMenu } from '@module-base/components/dropdown-menu';
import ButtonSetting from '@module-global/components/AppHeader/AppSetting/ButtonSetting';

/** lazy components */
const MenuSetting = React.lazy(() => import('@module-global/components/AppHeader/AppSetting/MenuSetting'));

export default function AppSetting() {
    return (
        <DropdownMenu modal={false}>
            <ButtonSetting />
            <React.Suspense fallback={null}>
                <MenuSetting />
            </React.Suspense>
        </DropdownMenu>
    );
}
