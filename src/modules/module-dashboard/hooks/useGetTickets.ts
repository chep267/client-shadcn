/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { DashboardQueryKey } from '@module-dashboard/constants/query';

/** services */
import { dashboardService } from '@module-dashboard/services';

export function useGetTickets() {
    const { isPending, data } = useQuery({
        queryKey: [DashboardQueryKey.tickets],
        queryFn: dashboardService.getAll,
    });

    return { isPending, data: data?.data.data };
}
