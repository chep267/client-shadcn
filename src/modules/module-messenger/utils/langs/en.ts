/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/language';

export const en = {
    [MessengerLanguage.component.label.threads.title]: 'Threads',
    [MessengerLanguage.component.label.threads.sender]: 'You',
    [MessengerLanguage.component.label.conversation.body.empty]: 'Start a conversation with your friends',
} as const;
