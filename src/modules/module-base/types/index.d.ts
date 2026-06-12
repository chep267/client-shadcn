/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@module-base/types/data.d';
import * as TypeApi from '@module-base/types/api.d';
import * as TypeStore from '@module-base/types/store.d';
import * as TypeHook from '@module-base/types/hook.d';
import * as TypeComponent from '@module-base/types/component.d';

declare global {
    namespace App.ModuleBase {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Hook = TypeHook;
        export import Component = TypeComponent;
    }
}
