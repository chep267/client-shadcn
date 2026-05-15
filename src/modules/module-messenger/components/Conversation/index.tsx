/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Card, CardContent } from '@module-base/components/card';
import { WavyLoading } from '@module-base/components/animation/wavy-loading';
import { ConversationFooter } from '@module-messenger/components/Conversation/ConversationFooter';
import { ConversationHeader } from '@module-messenger/components/Conversation/ConversationHeader';

export function Conversation() {
    return (
        <Card className={cn('flex-1', 'ml-1 gap-0 rounded-sm border-l p-0')}>
            <ConversationHeader />

            <CardContent className="flex-1">
                <WavyLoading />
            </CardContent>

            <ConversationFooter />
        </Card>
    );
}
