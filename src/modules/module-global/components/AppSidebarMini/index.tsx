/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

/** constants */
import { SidebarItems } from '@module-global/constants/SidebarItems';

/** components */
import { ButtonGroup } from '@module-base/components/button-group';
import AppSidebarMiniItem from '@module-global/components/AppSidebarMini/AppSidebarMiniItem';

export default function AppSidebarMini() {
    const { pathname } = useLocation();

    return (
        <ButtonGroup
            className={clsx(
                'bg-background sticky top-(--app-size-height-header) z-(--z-index-header) w-full border-b',
                '[&>a:not(:first-child)]:!border-l',
                'tablet:hidden'
            )}
        >
            {SidebarItems.map((item) => (
                <AppSidebarMiniItem key={item.path} item={item} active={item.path === pathname} />
            ))}
        </ButtonGroup>
    );
}
