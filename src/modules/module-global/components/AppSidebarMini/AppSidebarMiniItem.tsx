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

interface SidebarMiniItemProps {
    item: {
        path: string;
        icon: React.ElementType;
        name: string;
    };
    active: boolean;
}

const AppSidebarMiniItem = React.memo(function SidebarMiniItem(props: SidebarMiniItemProps) {
    const { item, active } = props;

    return (
        <Button asChild variant="ghost" size="lg">
            <Link
                to={item.path}
                className={clsx('grow rounded-none', {
                    '!text-main': active,
                })}
            >
                <item.icon />
            </Link>
        </Button>
    );
});

export default AppSidebarMiniItem;
