/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data.d';

export interface TypeUserAvatarProps {
    uid?: TypeUser['uid'];
}

export interface TypeUserNameProps {
    uid?: TypeUser['uid'];
    name?: TypeUser['displayName'];
}
