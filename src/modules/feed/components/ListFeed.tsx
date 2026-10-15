/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useGetFeeds } from '@modules/feed/hooks/useGetFeeds';

/** components */
import { Feed } from '@modules/feed/components/Feed';
import { FeedSkeleton } from '@modules/feed/components/FeedSkeleton';

export function ListFeed() {
    const { isPending, data } = useGetFeeds();

    return (
        <div className="tablet:gap-4 flex flex-1 flex-col items-center gap-2">
            {isPending ? <FeedSkeleton length={3} /> : data?.map((item) => <Feed key={item.id} data={item} />)}
        </div>
    );
}
