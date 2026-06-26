/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

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
