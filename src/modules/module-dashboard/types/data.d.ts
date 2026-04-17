/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */

export type TypeTicketStatus = 'todo' | 'in_progress' | 'done' | 'warning' | 'error';

export interface TypeTicketData {
    id: string;
    title: string;
    assignee: {
        name: string;
        avatar?: string;
    };
    status: TypeTicketStatus;
    createdAt: number;
    deadline: number;
}
