/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { produce } from 'immer';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** services */
import { dashboardService } from '@module-dashboard/services';

/** types */
import type { AxiosResponse } from 'axios';

export function useRemoveTicket() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: dashboardService.remove,
        onSuccess: (_, deletedId) => {
            // update cache
            queryClient.setQueryData(
                ['use-get-all-ticket'],
                (cache: AxiosResponse<App.ModuleDashboard.Api.TypeApiDashboard['GetAll']['Response']>) => {
                    return produce(cache, (draft) => {
                        draft.data.data.items = draft.data.data.items.filter((item) => item.id !== deletedId);
                    });
                }
            );
            toast.success('Successfully deleted!', {
                description: 'You have successfully deleted the task',
            });
        },
        onError: () => {
            toast.error('Failed to delete!', {
                description: 'Failed to delete the task',
            });
        },
    });
}
