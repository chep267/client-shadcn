/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-calendar/types/data.d';
import type * as TypeStore from '@module-calendar/types/store.d';
import type * as TypeComponent from '@module-calendar/types/component.d';

declare global {
    namespace App.ModuleCalendar {
        export import Data = TypeData;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
