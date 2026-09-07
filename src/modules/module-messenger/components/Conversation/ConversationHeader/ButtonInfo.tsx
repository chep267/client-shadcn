/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { InfoIcon } from 'lucide-react';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonInfo() {
    const action = useMessengerStore((store) => store.action);

    return (
        <Button
            variant="outline"
            className={cn(
                'h-6 w-6 border-none p-0',
                'cursor-pointer rounded-full text-inherit shadow-none',
                'hover:text-main hover:bg-transparent'
            )}
            aria-label="thread-info"
            onClick={action.toggleInfo}
        >
            <InfoIcon className="size-6" />
        </Button>
    );
}
