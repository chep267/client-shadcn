/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { UserNameGet } from '@modules/user/components/UserName/UserNameGet';
import { UserNameNoGet } from '@modules/user/components/UserName/UserNameNoGet';

export function UserName(props: App.Module.User.Component.UserNameProps) {
    const { className, loading, id, name, ...otherProps } = props;

    if (!name && !!id) {
        return <UserNameGet className={className} id={id} loading={loading} {...otherProps} />;
    }
    return <UserNameNoGet className={className} name={name} {...otherProps} />;
}
