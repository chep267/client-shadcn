/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { SearchIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonSearch() {
    const action = useMessengerStore((store) => store.action);

    return (
        <Button
            variant="outline"
            className={cn(
                'size-10 min-w-10 border-0',
                'cursor-pointer rounded-full text-inherit shadow-none',
                'hover:border hover:text-inherit'
            )}
            aria-label="thread-search"
            onClick={action.toggleSearch}
        >
            <SearchIcon />
        </Button>
    );
}
