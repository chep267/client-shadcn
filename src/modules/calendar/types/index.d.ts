/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@modules/calendar/types/data.d';
import type * as TypeStore from '@modules/calendar/types/store.d';
import type * as TypeComponent from '@modules/calendar/types/component.d';

declare global {
    namespace App.Module.Calendar {
        export import Data = TypeData;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
