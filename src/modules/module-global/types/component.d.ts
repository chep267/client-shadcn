/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as React from 'react';

export interface TypeAppItem {
    path: string;
    icon: React.ElementType;
    name: string;
}

export interface SidebarItemProps {
    item: TypeAppItem;
    active?: boolean;
}
