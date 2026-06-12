/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-user/types/data.d';
import type * as TypeApi from '@module-user/types/api.d';
import type * as TypeStore from '@module-user/types/store.d';
import type * as TypeComponent from '@module-user/types/component.d';

declare global {
    namespace App.ModuleUser {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
