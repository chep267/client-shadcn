/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Link } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';

const AppSidebarMiniItem = React.memo(function AppSidebarMiniItem(props: App.ModuleGlobal.Component.SidebarItemProps) {
    const { item, active } = props;

    return (
        <Button
            asChild
            aria-label={item.name}
            variant="ghost"
            size="lg"
            className={cn('grow rounded-none', {
                'text-main hover:text-main': active,
            })}
        >
            <Link to={item.path} aria-label={item.name}>
                <item.icon />
            </Link>
        </Button>
    );
});

export { AppSidebarMiniItem };
