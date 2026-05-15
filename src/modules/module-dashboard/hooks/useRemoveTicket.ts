/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { produce } from 'immer';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** constants */
import { DashboardQueryKey } from '@module-dashboard/constants/query';

/** services */
import { dashboardService } from '@module-dashboard/services';

/** types */
import type { AxiosResponse } from 'axios';

export function useRemoveTicket() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: dashboardService.remove,
        onSuccess: (_, { id }) => {
            /** update cache */
            queryClient.setQueryData(
                [DashboardQueryKey.tickets],
                (cache: AxiosResponse<App.ModuleDashboard.Api.TypeApi['GetAll']['Response']>) => {
                    return produce(cache, (draft) => {
                        draft.data.data.items = draft.data.data.items.filter((item) => item.id !== id);
                    });
                }
            );
            toast.success('Success!', {
                description: 'You have successfully deleted the ticket ID: ' + id,
            });
        },
        onError: (_, { id }) => {
            toast.error('Error!', {
                description: 'Failed to delete the ticket ID: ' + id,
            });
        },
    });
}
