/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { Typography } from '@module-base/components/typography';
import { UserNameGet } from '@module-user/components/UserName/UserNameGet';
import { UserNameNoGet } from '@module-user/components/UserName/UserNameNoGet';

interface UserNameProps extends React.ComponentProps<typeof Typography> {
    uid?: string;
    name?: string;
}

export function UserName(props: UserNameProps) {
    const { className, uid, name } = props;

    if (!name) {
        return <UserNameGet className={className} uid={uid} />;
    }
    return <UserNameNoGet className={className} name={name} />;
}
