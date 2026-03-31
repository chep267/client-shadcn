/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data.d';

export interface UserAvatarProps {
    uid?: TypeUser['uid'];
}

export interface UserNameProps {
    uid?: TypeUser['uid'];
    name?: TypeUser['displayName'];
}
