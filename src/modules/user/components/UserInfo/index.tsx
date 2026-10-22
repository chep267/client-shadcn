/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { Link } from 'react-router';

/** constants */
import { UserRouterPath } from '@modules/user/constants';

/** components */
import { UserAvatar } from '@modules/user/components/UserAvatar';
import { UserName } from '@modules/user/components/UserName';

export function UserInfo(props: App.Module.User.Component.UserInfoProps) {
    const { className, id, sizeAvatar, sizeName, description, link } = props;

    const Comp = link ? Link : 'div';

    return (
        <Comp
            data-slot="user-info"
            to={link && !!id ? UserRouterPath.root.replace('/*', id) : ''}
            className={cn('group/user flex items-center gap-3', className)}
        >
            <UserAvatar id={id} size={sizeAvatar} className="border" />
            <div className="flex flex-col">
                <UserName id={id} className={cn({ 'group-hover/user:text-main!': link })} component={sizeName} />
                {typeof description === 'function' ? description() : description}
            </div>
        </Comp>
    );
}
