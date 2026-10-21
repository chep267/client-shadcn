/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { PoemQueryKey } from '@modules/poem/constants';

/** services */
import { poemService } from '@modules/poem/services';

export function useGetPoems(payload: App.Module.Poem.Api.PoemService['Gets']['Payload'] = {}) {
    const { isPending, data } = useQuery({
        queryKey: [PoemQueryKey.poems, payload],
        queryFn: () => poemService.gets(payload),
    });

    return { isPending, data };
}
