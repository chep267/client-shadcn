/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';
import { SendHorizonalIcon, ThumbsUpIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';

export function ButtonSend() {
    const { tid = '' } = useParams();

    const isTyping = useMessengerStore((store) => {
        return store.data.typings.get(tid) || store.data.drafts.get(tid) || store.data.assets.get(tid);
    });
    const action = useMessengerStore((store) => store.action);

    const Icon = isTyping ? SendHorizonalIcon : ThumbsUpIcon;

    return (
        <Button
            variant="ghost"
            className={cn(
                'size-10',
                'cursor-pointer rounded-full text-inherit shadow-none',
                'hover:text-main hover:border hover:bg-transparent'
            )}
            aria-label="message-send"
            onClick={action.toggleInfo}
        >
            <Icon className="size-6" />
        </Button>
    );
}
