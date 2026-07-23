/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import type { Typography } from '@module-base/components/typography';
import { UserNameGet } from '@module-user/components/UserName/UserNameGet';
import { UserNameNoGet } from '@module-user/components/UserName/UserNameNoGet';

interface UserNameProps extends React.ComponentProps<typeof Typography> {
    loading?: boolean;
    uid?: string;
    name?: string;
}

export function UserName(props: UserNameProps) {
    const { className, loading, uid, name } = props;

    if (!name && !!uid) {
        return <UserNameGet className={className} uid={uid} loading={loading} />;
    }
    return <UserNameNoGet className={className} name={name} />;
}
