/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Typography } from '@module-base/components/typography';
import { Card, CardHeader, CardTitle, CardContent } from '@module-base/components/card';
import { ThreadCurrent } from '@module-messenger/components/ThreadInfo/ThreadCurrent';

export function ThreadInfo() {
    const openInfo = useMessengerStore((store) => store.data.openInfo);

    return (
        <Card
            className={cn(
                'w-0 gap-0 overflow-hidden rounded-sm p-0',
                'transition-all duration-200 ease-linear',
                'max-laptop:absolute max-laptop:top-[calc(var(--app-size-height-messenger-conversation-header)+var(--spacing))] max-laptop:right-1 max-laptop:bottom-1 max-laptop:z-1 max-laptop:rounded-t-none max-laptop:rounded-l-none',
                {
                    'laptop:ml-1 laptop:w-(--app-size-width-messenger-threads) w-(--app-size-width-messenger-threads-expanded)':
                        openInfo,
                    'border-0': !openInfo,
                }
            )}
        >
            <CardHeader
                className={cn(
                    'items-center gap-0 border-b p-2!',
                    'grid-rows-[auto] items-center',
                    'h-(--app-size-height-messenger-conversation-header)'
                )}
            >
                <CardTitle>
                    <Typography component="h4">
                        <FormattedMessage id="1" defaultMessage="Thread Info" />
                    </Typography>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ThreadCurrent />
            </CardContent>
        </Card>
    );
}
