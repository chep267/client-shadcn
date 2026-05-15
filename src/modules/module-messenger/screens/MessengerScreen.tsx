/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Threads } from '@module-messenger/components/Threads';
import { Conversation } from '@module-messenger/components/Conversation';
import { ThreadInfo } from '@module-messenger/components/ThreadInfo';

export default function MessengerScreen() {
    return (
        <div className={cn('flex flex-1 p-1')}>
            <Threads />
            <Conversation />
            <ThreadInfo />
        </div>
    );
}
