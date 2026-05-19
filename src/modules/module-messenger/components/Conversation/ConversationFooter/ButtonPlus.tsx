/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { PlusCircleIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonPlus() {
    const action = useMessengerStore((store) => store.action);

    return (
        <Button
            variant="ghost"
            className={cn('size-10', 'cursor-pointer rounded-full text-inherit shadow-none', 'hover:text-main')}
            aria-label="choose-option"
            onClick={action.toggleInfo}
        >
            <PlusCircleIcon className="size-6" />
        </Button>
    );
}
