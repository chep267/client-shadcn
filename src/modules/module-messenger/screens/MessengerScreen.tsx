/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useSocket } from '@module-messenger/hooks/useSocket';

/** components */
import { Threads } from '@module-messenger/components/Threads';
import { Conversation } from '@module-messenger/components/Conversation';
import { ThreadInfo } from '@module-messenger/components/ThreadInfo';

export default function MessengerScreen() {
    useSocket();

    return (
        <div className={cn('relative flex flex-1 p-1')}>
            <Threads />
            <Conversation />
            <ThreadInfo />
        </div>
    );
}
