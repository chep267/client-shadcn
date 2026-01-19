/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

/** components */
import { Button } from '@module-base/components/button';

const AppSidebarMiniItem = React.memo(function AppSidebarMiniItem(props: App.ModuleGlobal.Component.SidebarItemProps) {
    const { item, active } = props;

    return (
        <Button
            asChild
            variant="ghost"
            size="lg"
            className={clsx('grow rounded-none', {
                'text-main hover:text-main': active,
            })}
        >
            <Link to={item.path}>
                <item.icon />
            </Link>
        </Button>
    );
});

export default AppSidebarMiniItem;
