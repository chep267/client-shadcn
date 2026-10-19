/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { UserAvatarNoGet } from '@modules/user/components/UserAvatar/UserAvatarNoGet';
import { UserAvatarGet } from '@modules/user/components/UserAvatar/UserAvatarGet';

export function UserAvatar(props: App.Module.User.Component.UserAvatarProps) {
    const { className, loading, id, src, name, ...otherProps } = props;

    if (!src && !!id) {
        return <UserAvatarGet className={className} id={id} loading={loading} {...otherProps} />;
    }
    return <UserAvatarNoGet className={className} src={src} name={name} {...otherProps} />;
}
