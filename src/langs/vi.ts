/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { vi as viBase } from '@module-base/utils/langs/vi';
import { vi as viUser } from '@module-user/utils/langs/vi';
import { vi as viAuth } from '@module-auth/utils/langs/vi';
import { vi as viGlobal } from '@module-global/utils/langs/vi';
import { vi as viCalendar } from '@module-calendar/utils/langs/vi';
import { vi as viPoem } from '@module-poem/utils/langs/vi';
import { vi as viDashboard } from '@module-dashboard/utils/langs/vi';
import { vi as viMessenger } from '@module-messenger/utils/langs/vi';

export const vi: App.ModuleBase.Data.LanguageMessages = Object.assign(
    {},
    viBase,
    viUser,
    viAuth,
    viGlobal,
    viCalendar,
    viPoem,
    viDashboard,
    viMessenger
);
