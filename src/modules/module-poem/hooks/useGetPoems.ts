/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { PoemQueryKey } from '@module-poem/constants/query';

/** services */
import { poemService } from '@module-poem/services';

export function useGetPoems() {
    const { isPending, data } = useQuery({
        queryKey: [PoemQueryKey.poems],
        queryFn: poemService.getPoems,
    });

    return { isPending, data };
}
