/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */

export interface TypeTicketData {
    id: string;
    description: string;
    assignee: {
        name: string;
        avatar?: string;
    };
    status: string;
    createdAt: number;
    deadline: number;
}
