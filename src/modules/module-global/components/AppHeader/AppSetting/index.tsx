/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { DropdownMenu } from '@module-base/components/dropdown-menu';
import ButtonSetting from '@module-global/components/AppHeader/AppSetting/ButtonSetting';
import MenuSetting from '@module-global/components/AppHeader/AppSetting/MenuSetting';

export default function AppSetting() {
    return (
        <DropdownMenu modal={false}>
            <ButtonSetting />
            <MenuSetting />
        </DropdownMenu>
    );
}
