/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TicketData } from '@module-dashboard/types/data.d';

/** Dashboard store */
interface DashboardData {
    ticketIds: string[];
    tickets: TicketData[];
    itemDelete: TicketData | null;
    itemEdit: TicketData | null;
}
interface DashboardAction {
    setData: (options?: Partial<DashboardData>) => void;
}
export interface DashboardStore {
    data: DashboardData;
    action: DashboardAction;
}
