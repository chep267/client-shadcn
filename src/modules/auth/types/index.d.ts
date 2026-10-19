/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeApi from '@modules/auth/types/api.d';
import type * as TypeComponent from '@modules/auth/types/component.d';
import type * as TypeStore from '@modules/auth/types/store.d';

declare global {
    namespace App.Module.Auth {
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Component = TypeComponent;
    }
}
