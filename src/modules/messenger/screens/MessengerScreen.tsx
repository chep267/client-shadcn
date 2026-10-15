/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** hooks */
import { useSocket } from '@modules/messenger/hooks/useSocket';

/** components */
import { Threads } from '@modules/messenger/components/Threads';
import { Conversation } from '@modules/messenger/components/Conversation';
import { ThreadInfo } from '@modules/messenger/components/ThreadInfo';

export default function MessengerScreen() {
    useSocket();

    return (
        <div className={cn('relative flex flex-1 p-1', 'max-h-(--app-size-height-screen)')}>
            <Threads />
            <Conversation />
            <ThreadInfo />
        </div>
    );
}
