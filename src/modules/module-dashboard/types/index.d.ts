/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-dashboard/types/data.d';
import type * as TypeApi from '@module-dashboard/types/api.d';
import type * as TypeComponent from '@module-dashboard/types/component.d';
import type * as TypeStore from '@module-dashboard/types/store.d';

declare global {
    namespace App.ModuleDashboard {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
