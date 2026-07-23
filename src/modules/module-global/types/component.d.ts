/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ElementType } from 'react';

export interface AppItem {
    path: string;
    icon: ElementType;
    name: string;
}

export interface SidebarItemProps {
    item: AppItem;
    active?: boolean;
}
