/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { dashboardService } from '@module-dashboard/services';

export const queryKey = 'DASHBOARD_QUERY_KEY_GET_ALL_STATUS';

export function useGetTicketStatus() {
    const { isPending, data } = useQuery({
        queryKey: [queryKey],
        queryFn: dashboardService.getStatus,
    });

    return { isPending, data: data?.data.data };
}
