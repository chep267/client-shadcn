/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetThreads } from '@module-messenger/hooks/useGetThreads';

/** components */
import { Typography } from '@module-base/components/typography';
import { Card, CardHeader, CardTitle, CardContent } from '@module-base/components/card';
import { VirtualList } from '@module-base/components/virtual-list';
import { ThreadItem } from '@module-messenger/components/Threads/ThreadItem';

export function Threads() {
    const navigate = useNavigate();
    const params = useParams();
    const {
        isPending,
        data: { items },
    } = useGetThreads();

    React.useEffect(() => {
        if (items && !params.tid) {
            const firstConversation = items[0];
            navigate(`${MessengerRouterPath.home}/${firstConversation.tid}`, { replace: true });
        }
    }, [items, params.tid]);

    return (
        <Card
            className={cn(
                'flex-1 gap-0 rounded-sm p-0',
                'max-w-(--app-size-width-messenger-threads) min-w-(--app-size-width-messenger-threads)',
                'transition-all duration-200 ease-linear'
            )}
        >
            <CardHeader
                className={cn(
                    'items-center gap-0 border-b p-2!',
                    'grid-rows-[auto] items-center',
                    'h-(--app-size-height-messenger-conversation-header)',
                    'max-tablet:hidden'
                )}
            >
                <CardTitle>
                    <Typography component="h4">
                        <FormattedMessage id="1" defaultMessage="Threads" />
                    </Typography>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <VirtualList
                    className="max-tablet:[&>div]:scrollbar-hidden"
                    loading={isPending}
                    data={items}
                    itemContent={(index, thread) => (
                        <ThreadItem
                            className={cn({
                                'border-t': index > 0,
                                'bg-main/50!': params.tid === thread.tid,
                            })}
                            data={thread}
                        />
                    )}
                />
            </CardContent>
        </Card>
    );
}
