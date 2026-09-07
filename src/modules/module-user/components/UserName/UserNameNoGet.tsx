/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import React from 'react';
import { cn } from 'cn';

/** components */
import { Typography } from '@module-base/components/typography';

interface UserNameNoGetProps extends React.ComponentProps<typeof Typography> {
    name?: string;
}

export function UserNameNoGet(props: UserNameNoGetProps) {
    const { className, name, ...otherProps } = props;

    return (
        <Typography data-slot="name" className={cn('truncate', className)} {...otherProps}>
            {name}
        </Typography>
    );
}
