/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { Typography } from '@modules/base/components/typography';

export function UserNameNoGet(props: App.Module.User.Component.UserNameProps) {
    const { className, name, ...otherProps } = props;

    return (
        <Typography data-slot="user-name" className={cn('truncate', className)} {...otherProps}>
            {name || 'Unknown user'}
        </Typography>
    );
}
