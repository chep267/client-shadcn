/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { en as enBase } from '@modules/base/utils/langs/en';
import { en as enUser } from '@modules/user/utils/langs/en';
import { en as enAuth } from '@modules/auth/utils/langs/en';
import { en as enGlobal } from '@modules/global/utils/langs/en';
import { en as enCalendar } from '@modules/calendar/utils/langs/en';
import { en as enPoem } from '@modules/poem/utils/langs/en';
import { en as enFeed } from '@modules/feed/utils/langs/en';
import { en as enMessenger } from '@modules/messenger/utils/langs/en';

export const en: App.Module.Base.Data.LanguageMessages = Object.assign(
    {},
    enBase,
    enUser,
    enAuth,
    enGlobal,
    enCalendar,
    enPoem,
    enFeed,
    enMessenger
);
