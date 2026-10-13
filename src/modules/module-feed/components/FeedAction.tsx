/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { FormattedMessage } from 'react-intl';
import { ThumbsUpIcon, MessageSquareIcon, ForwardIcon } from 'lucide-react';

/** constants */
import { FeedLanguage } from '@module-feed/constants/language';

/** components */
import { Typography } from '@module-base/components/typography';
import { Button } from '@module-base/components/button';

interface FeedActionProps extends React.ComponentProps<'div'> {
    fid?: string;
}

export function FeedAction(props: FeedActionProps) {
    const { fid: _fid, ...otherProps } = props;

    return (
        <div
            className={cn(
                'flex items-center justify-between',
                'w-full select-none',
                '[&_span]:hidden', // mobile
                'mobile:[&_span]:block' // desktop
            )}
            {...otherProps}
        >
            <Button variant="ghost" className="hover:text-main cursor-pointer">
                <ThumbsUpIcon className="size-4" />
                <Typography>
                    <FormattedMessage id={FeedLanguage.component.button.like} defaultMessage="Like" />
                </Typography>
            </Button>
            <Button variant="ghost" className="hover:text-main cursor-pointer">
                <MessageSquareIcon className="size-4" />
                <Typography>
                    <FormattedMessage id={FeedLanguage.component.button.comment} defaultMessage="Comment" />
                </Typography>
            </Button>
            <Button variant="ghost" className="hover:text-main cursor-pointer">
                <ForwardIcon className="size-4" />
                <Typography>
                    <FormattedMessage id={FeedLanguage.component.button.share} defaultMessage="Share" />
                </Typography>
            </Button>
        </div>
    );
}
