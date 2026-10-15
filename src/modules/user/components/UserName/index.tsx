/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import type { Typography } from '@modules/base/components/typography';
import { UserNameGet } from '@modules/user/components/UserName/UserNameGet';
import { UserNameNoGet } from '@modules/user/components/UserName/UserNameNoGet';

interface UserNameProps extends React.ComponentProps<typeof Typography> {
    loading?: boolean;
    uid?: string;
    name?: string;
}

export function UserName(props: UserNameProps) {
    const { className, loading, uid, name, ...otherProps } = props;

    if (!name && !!uid) {
        return <UserNameGet className={className} uid={uid} loading={loading} {...otherProps} />;
    }
    return <UserNameNoGet className={className} name={name} {...otherProps} />;
}
