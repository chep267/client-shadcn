/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Typography } from '@module-base/components/typography';
import { Card, CardHeader, CardTitle, CardContent } from '@module-base/components/card';
import { ThreadList } from '@module-messenger/components/Threads/ThreadList';
import { ButtonSearch } from '@module-messenger/components/Threads/ButtonSearch';
import { ThreadSearch } from '@module-messenger/components/Threads/ThreadSearch';

export function Threads() {
    return (
        <Card
            className={cn(
                'flex-1 gap-0 overflow-hidden rounded-sm p-0',
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
                <CardTitle className={cn('flex items-center justify-between', 'gap-2 overflow-hidden')}>
                    <Typography component="h4">
                        <FormattedMessage
                            id={MessengerLanguage.component.label.threads.title}
                            defaultMessage={MessengerLanguage.component.label.threads.title}
                        />
                    </Typography>
                    <ButtonSearch />
                </CardTitle>
            </CardHeader>
            <CardContent className="relative flex flex-1 flex-col p-0">
                <ThreadSearch />
                <ThreadList />
            </CardContent>
        </Card>
    );
}
