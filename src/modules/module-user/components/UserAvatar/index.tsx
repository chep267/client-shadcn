/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { Avatar } from '@module-base/components/avatar';
import { UserAvatarNoGet } from '@module-user/components/UserAvatar/UserAvatarNoGet';
import { UserAvatarGet } from '@module-user/components/UserAvatar/UserAvatarGet';

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
    loading?: boolean;
    uid?: string;
    src?: string;
    name?: string;
}

export function UserAvatar(props: UserAvatarProps) {
    const { className, loading, uid, src, name } = props;

    if (!src && !!uid) {
        return <UserAvatarGet className={className} uid={uid} loading={loading} />;
    }
    return <UserAvatarNoGet className={className} src={src} name={name} />;
}
