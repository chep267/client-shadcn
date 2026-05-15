/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Typography } from '@module-base/components/typography';
import { Card, CardHeader, CardTitle, CardContent } from '@module-base/components/card';
import { WavyLoading } from '@module-base/components/animation/wavy-loading';

export function ThreadInfo() {
    const params = useParams();
    const { data } = useGetThread(params.tid);

    const openInfo = useMessengerStore((store) => store.data.openInfo);

    console.log('data: ', data);

    return (
        <Card
            className={cn(
                'gap-0 rounded-sm p-0',
                'overflow-hidden',
                'w-0 min-w-0 border-0',
                'max-w-(--app-size-width-messenger-threads)',
                'transition-all duration-200 ease-linear',
                {
                    'tablet:ml-1 tablet:w-full tablet:min-w-(--app-size-width-messenger-threads) tablet:border':
                        openInfo,
                }
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
                        <FormattedMessage id="1" defaultMessage="Thread Info" />
                    </Typography>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <WavyLoading />
            </CardContent>
        </Card>
    );
}
