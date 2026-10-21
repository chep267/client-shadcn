/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { useLocation } from 'react-router';

/** constants */
import { SidebarItems } from '@modules/global/components/SidebarItems';

/** components */
import { ButtonGroup } from '@modules/base/components/button-group';
import { AppSidebarMiniItem } from '@modules/global/components/AppSidebarMini/AppSidebarMiniItem';

export function AppSidebarMini() {
    const { pathname } = useLocation();

    return (
        <ButtonGroup
            className={cn(
                'bg-background sticky top-(--app-size-height-header) z-(--z-index-header) w-full border-b',
                'h-(--app-size-height-sidebar-mini) items-center justify-between',
                '[&>a:not(:first-child)]:border-l!',
                'tablet:hidden'
            )}
        >
            {SidebarItems.map((item) => (
                <AppSidebarMiniItem key={item.path} item={item} active={item.path === pathname} />
            ))}
        </ButtonGroup>
    );
}
