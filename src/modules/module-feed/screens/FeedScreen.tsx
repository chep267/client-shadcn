/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { ListFeed } from '@module-feed/components/ListFeed';

export default function FeedScreen() {
    return (
        <div className={cn('flex flex-1 flex-col', 'px-1 py-2', 'tablet:p-4')}>
            <ListFeed />
        </div>
    );
}
