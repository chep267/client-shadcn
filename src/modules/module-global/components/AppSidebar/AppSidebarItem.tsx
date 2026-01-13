/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** components */
import { Tooltip, TooltipContent, TooltipTrigger } from '@module-base/components/tooltip';
import { SidebarMenuButton, SidebarMenuItem } from '@module-base/components/sidebar';

interface SidebarItemProps {
    item: {
        path: string;
        icon: React.ElementType;
        name: string;
    };
    active?: boolean;
    tooltip?: boolean;
}

const AppSidebarItem = React.memo(function SidebarItem(props: SidebarItemProps) {
    const { item, active, tooltip } = props;

    const ButtonContent = (
        <Link to={item.path}>
            <item.icon />
            <span className="truncate">
                <FormattedMessage id={item.name} />
            </span>
        </Link>
    );

    return (
        <SidebarMenuItem>
            <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarMenuButton asChild size="lg" isActive={active} className="data-[active=true]:text-main">
                        {ButtonContent}
                    </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" hidden={!tooltip}>
                    <FormattedMessage id={item.name} />
                </TooltipContent>
            </Tooltip>
        </SidebarMenuItem>
    );
});

export default AppSidebarItem;
