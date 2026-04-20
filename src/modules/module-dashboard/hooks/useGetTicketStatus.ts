/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { dashboardService } from '@module-dashboard/services';

export const queryKey = 'use-get-ticket-status';

export function useGetTicketStatus() {
    return useQuery({
        queryKey: [queryKey],
        queryFn: dashboardService.getStatus,
    });
}
