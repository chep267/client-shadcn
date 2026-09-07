/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

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
