/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@modules/user/types/data.d';
import type * as TypeApi from '@modules/user/types/api.d';
import type * as TypeStore from '@modules/user/types/store.d';
import type * as TypeComponent from '@modules/user/types/component.d';

declare global {
    namespace App.Module.User {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
