/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@modules/base/types/data.d';
import * as TypeApi from '@modules/base/types/api.d';
import * as TypeStore from '@modules/base/types/store.d';
import * as TypeHook from '@modules/base/types/hook.d';
import * as TypeComponent from '@modules/base/types/component.d';

declare global {
    namespace App.Module.Base {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Hook = TypeHook;
        export import Component = TypeComponent;
    }
}
