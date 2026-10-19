/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import { type ReactNode, type ComponentProps } from 'react';
import type { Avatar } from '@modules/base/components/avatar';
import type { Typography } from '@modules/base/components/typography';

export interface UserAvatarProps extends ComponentProps<typeof Avatar> {
    loading?: boolean;
    id?: string;
    src?: string;
    name?: string;
}

export interface UserNameProps extends ComponentProps<typeof Typography> {
    loading?: boolean;
    id?: string;
    name?: string;
}

export interface UserInfoProps {
    className?: string;
    id?: string;
    sizeAvatar?: UserAvatarProps['size'];
    sizeName?: UserNameProps['component'];
    description?: ReactNode | (() => ReactNode);
    link?: boolean;
}
