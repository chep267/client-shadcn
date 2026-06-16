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

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** hooks */
import { useGetThread } from '@module-messenger/hooks/useGetThread';

/** components */
import { Typography } from '@module-base/components/typography';
import { Card, CardHeader, CardTitle, CardContent } from '@module-base/components/card';
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

export function ThreadInfo() {
    const { tid = '' } = useParams();
    // const isDraft = tid.startsWith('uid.');

    const meId = useAuthStore((store) => store.data.user!.id);
    const openInfo = useMessengerStore((store) => store.data.openInfo);
    const { data } = useGetThread(tid);
    const { data: thread } = data ?? {};

    const { name, avatar, uids, metadata } = thread ?? {};
    const { isGroup } = metadata ?? {};
    const peerId = uids?.find((uid) => uid !== meId);

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
                <div className="flex flex-1 flex-col items-center gap-2 p-4">
                    <UserAvatar
                        className="size-28 [&>span]:data-[slot=avatar-fallback]:text-4xl"
                        name={name}
                        src={avatar}
                        uid={isGroup ? '' : peerId}
                        loading={!tid}
                    />
                    <UserName name={name} uid={isGroup ? '' : peerId} loading={!tid} />
                </div>
            </CardContent>
        </Card>
    );
}
