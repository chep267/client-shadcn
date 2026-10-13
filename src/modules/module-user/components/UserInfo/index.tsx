/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { Link } from 'react-router';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

interface UserInfoProps {
    className?: string;
    uid?: string;
    size?: React.ComponentProps<typeof UserAvatar>['size'];
    description?: React.ReactNode | (() => React.ReactNode);
}

export function UserInfo(props: UserInfoProps) {
    const { className, uid, size, description } = props;

    return (
        <Link
            data-slot="user-info"
            to={`/profile/${uid}`}
            className={cn('group/user flex items-center gap-3', className)}
        >
            <UserAvatar uid={uid} size={size} />
            <div data-slot="user-info-content" className="flex flex-col">
                <UserName uid={uid} className="group-hover/user:text-main!" />
                {typeof description === 'function' ? description() : description}
            </div>
        </Link>
    );
}
