/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';

/** components */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@modules/base/components/card';
import FeedAttachments from '@modules/feed/components/FeedAttachments';
import { FeedAction } from '@modules/feed/components/FeedAction';
import { FeedOption } from '@modules/feed/components/FeedOption';
import { UserInfo } from '@modules/user/components/UserInfo';

interface FeedProps {
    data: App.Module.Feed.Data.TypeFeed;
}

export function Feed(props: FeedProps) {
    const { data: feed } = props;

    const safeContent = React.useMemo(() => {
        if (!feed.content) return '';
        return DOMPurify.sanitize(feed.content);
    }, [feed.content]);

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                    <UserInfo
                        sizeAvatar="lg"
                        id={feed.authorId}
                        link
                        description={
                            <CardDescription className="text-xs font-normal">
                                {dayjs(feed.createdAt).format('DD/MM/YYYY - HH:mm')}
                            </CardDescription>
                        }
                    />
                    <FeedOption />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p dangerouslySetInnerHTML={{ __html: safeContent }} />
                <FeedAttachments className="mt-5" attachments={feed.attachments} />
            </CardContent>
            <CardFooter className="border-t">
                <FeedAction />
            </CardFooter>
        </Card>
    );
}
