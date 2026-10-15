/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
export type TypeFeed = {
    id: string;
    authorId: string;
    content?: string | null;
    keywords?: string[] | null;
    categories?: string[] | null;
    attachments?: Attachment[] | null;
    language?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};
