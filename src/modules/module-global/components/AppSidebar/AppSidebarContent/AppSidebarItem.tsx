/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

/** components */
import { SidebarMenuButton, SidebarMenuItem } from '@module-base/components/sidebar';

const AppSidebarItem = React.memo(function SidebarItem(props: App.ModuleGlobal.Component.SidebarItemProps) {
    const { item, active } = props;
    const { formatMessage } = useIntl();
    const appName = formatMessage({ id: item.name, defaultMessage: item.name });

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                size="lg"
                isActive={active}
                className="data-[active=true]:text-main"
                tooltip={appName}
            >
                <Link to={item.path}>
                    <item.icon />
                    <span className="truncate">{appName}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
});

export default AppSidebarItem;
