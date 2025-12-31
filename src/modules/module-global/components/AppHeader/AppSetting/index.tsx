/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { Menubar, MenubarMenu } from '@module-base/components/menubar';
import ButtonSetting from '@module-global/components/AppHeader/AppSetting/ButtonSetting';
import MenuSetting from '@module-global/components/AppHeader/AppSetting/a';

export default function AppSetting() {
    return (
        <Menubar className="border-0 bg-inherit shadow-none">
            <MenubarMenu>
                <ButtonSetting />
                <MenuSetting />
            </MenubarMenu>
        </Menubar>
    );
}
