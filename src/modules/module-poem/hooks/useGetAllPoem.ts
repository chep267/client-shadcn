/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { poemService } from '@module-poem/services';

export const queryKey = 'POEM_QUERY_KEY_GET_ALL_POEM';

export function useGetAllPoem() {
    const { isPending, data } = useQuery({
        queryKey: [queryKey],
        queryFn: poemService.getAll,
    });

    return { isPending, data: data?.data.data.items };
}
