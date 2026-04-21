/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data';

export type TypePoem = {
    id: string;
    title: string | null;
    description: string | null;
    content: string | null;
    author: TypeUser | null;
    createdAt: number | null;
    updatedAt: number | null;
};
