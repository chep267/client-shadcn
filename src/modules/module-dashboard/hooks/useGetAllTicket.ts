/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { dashboardService } from '@module-dashboard/services';

export const queryKey = 'DASHBOARD_QUERY_KEY_GET_ALL_TICKET';

export function useGetAllTicket() {
    const { isPending, data } = useQuery({
        queryKey: [queryKey],
        queryFn: dashboardService.getAll,
    });

    return { isPending, data: data?.data.data };
}
