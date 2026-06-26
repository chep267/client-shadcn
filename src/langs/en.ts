/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { en as enBase } from '@module-base/utils/langs/en';
import { en as enUser } from '@module-user/utils/langs/en';
import { en as enAuth } from '@module-auth/utils/langs/en';
import { en as enGlobal } from '@module-global/utils/langs/en';
import { en as enCalendar } from '@module-calendar/utils/langs/en';
import { en as enPoem } from '@module-poem/utils/langs/en';
import { en as enDashboard } from '@module-dashboard/utils/langs/en';
import { en as enMessenger } from '@module-messenger/utils/langs/en';

export const en: App.ModuleBase.Data.LanguageMessages = Object.assign(
    {},
    enBase,
    enUser,
    enAuth,
    enGlobal,
    enCalendar,
    enPoem,
    enDashboard,
    enMessenger
);
