/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { vi as viBase } from '@modules/base/utils/langs/vi';
import { vi as viUser } from '@modules/user/utils/langs/vi';
import { vi as viAuth } from '@modules/auth/utils/langs/vi';
import { vi as viGlobal } from '@modules/global/utils/langs/vi';
import { vi as viCalendar } from '@modules/calendar/utils/langs/vi';
import { vi as viPoem } from '@modules/poem/utils/langs/vi';
import { vi as viFeed } from '@modules/feed/utils/langs/vi';
import { vi as viMessenger } from '@modules/messenger/utils/langs/vi';

export const vi: App.Module.Base.Data.LanguageMessages = Object.assign(
    {},
    viBase,
    viUser,
    viAuth,
    viGlobal,
    viCalendar,
    viPoem,
    viFeed,
    viMessenger
);
