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

export function useGetPoems(payload: App.ModulePoem.Api.PoemControllerAction['Gets']['Payload'] = {}) {
    const { isPending, data } = useQuery({
        queryKey: [PoemQueryKey.poems, payload],
        queryFn: () => poemService.gets(payload),
    });

    return { isPending, data };
}
