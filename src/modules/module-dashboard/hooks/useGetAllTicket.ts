/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { dashboardService } from '@module-dashboard/services';

/** types */

export function useGetAllTicket() {
    return useQuery({
        queryKey: ['use-get-all-ticket'],
        queryFn: dashboardService.getAll,
    });
}
