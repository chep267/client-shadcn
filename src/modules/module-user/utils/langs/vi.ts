/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { FeedLanguage } from '@module-feed/constants/language';

export const vi = {
    // label
    [FeedLanguage.component.label.router]: 'Bảng tin',

    // button
    [FeedLanguage.component.button.option]: 'Chọn',
    [FeedLanguage.component.button.like]: 'Thích',
    [FeedLanguage.component.button.comment]: 'Bình luận',
    [FeedLanguage.component.button.share]: 'Chia sẻ',
} as const;
