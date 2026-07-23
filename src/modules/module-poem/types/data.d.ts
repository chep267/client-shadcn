/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { User } from '@module-user/types/data';

export interface TypePoem {
    id: string;
    title: string;
    description: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}
