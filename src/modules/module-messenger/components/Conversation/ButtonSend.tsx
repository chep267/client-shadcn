/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { SendHorizonalIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonSend() {
    const action = useMessengerStore((store) => store.action);

    return (
        <Button
            variant="ghost"
            className={cn(
                'h-10 w-10 border-0 p-0',
                'cursor-pointer rounded-full text-inherit shadow-none',
                'hover:text-main hover:border hover:bg-transparent'
            )}
            aria-label="dev"
            onClick={action.toggleInfo}
        >
            <SendHorizonalIcon className="size-6" />
        </Button>
    );
}
