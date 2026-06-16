/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { User } from '@module-user/types/data.d';

export interface UserAvatarProps {
    uid?: User['uid'];
}

export interface UserNameProps {
    uid?: User['uid'];
    name?: User['displayName'];
}
