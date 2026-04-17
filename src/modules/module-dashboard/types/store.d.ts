/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeTicketData } from '@module-dashboard/types/data';

/** Dashboard store */
type TypeDashboardData = {
    ticketIds: string[];
    tickets: TypeTicketData[];
    itemDelete: TypeTicketData | null;
    itemEdit: TypeTicketData | null;
};
type TypeDashboardAction = {
    setData: (options?: Partial<TypeDashboardData>) => void;
};
export type TypeDashboardStore = {
    data: TypeDashboardData;
    action: TypeDashboardAction;
};
