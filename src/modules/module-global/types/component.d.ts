/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as React from 'react';

export interface AppItem {
    path: string;
    icon: React.ElementType;
    name: string;
}

export interface SidebarItemProps {
    item: AppItem;
    active?: boolean;
}
