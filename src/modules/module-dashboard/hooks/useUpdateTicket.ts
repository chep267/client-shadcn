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

export function useUpdateTicket() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: dashboardService.update,
        onSuccess: (response, { id }) => {
            /** update cache */
            queryClient.setQueryData(
                [DashboardQueryKey.tickets],
                (cache: AxiosResponse<App.ModuleDashboard.Api.TypeApi['GetAll']['Response']>) => {
                    return produce(cache, (draft) => {
                        const pos = draft.data.data.items.findIndex((item) => item.id === id);
                        draft.data.data.items[pos] = response.data.data;
                    });
                }
            );
            toast.success('Success!', {
                description: 'You have successfully edited the ticket ID: ' + id,
            });
        },
        onError: (_, { id }) => {
            toast.error('Error!', {
                description: 'Failed to edit the ticket ID: ' + id,
            });
        },
    });
}
