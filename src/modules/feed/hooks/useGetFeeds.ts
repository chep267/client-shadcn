/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** constants */
import { FeedQueryKey } from '@modules/feed/constants/query';

/** services */
import { feedService } from '@modules/feed/services';

export function useGetFeeds(payload: App.ModulePoem.Api.PoemService['Gets']['Payload'] = {}) {
    const { isPending, data } = useQuery({
        queryKey: [FeedQueryKey.feeds, payload],
        queryFn: () => feedService.gets(payload),
    });

    return { isPending, data };
}
