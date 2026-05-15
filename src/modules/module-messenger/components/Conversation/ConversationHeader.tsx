/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { CardHeader, CardTitle } from '@module-base/components/card';
import { ThreadItemGet } from '@module-messenger/components/Threads/ThreadItemGet';
import { ButtonInfo } from '@module-messenger/components/Conversation/ButtonInfo';

export function ConversationHeader() {
    const params = useParams();

    return (
        <CardHeader
            className={cn(
                'gap-0 border-b p-2!',
                'grid-rows-[auto] items-center',
                'h-(--app-size-height-messenger-conversation-header) w-full'
            )}
        >
            <CardTitle className={cn('flex items-center justify-between', 'gap-2 overflow-hidden')}>
                <ThreadItemGet className="p-0" tid={params.tid} />
                <ButtonInfo />
            </CardTitle>
        </CardHeader>
    );
}
