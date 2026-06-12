/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@module-messenger/types/data.d';
import * as TypeApi from '@module-messenger/types/api.d';
import * as TypeStore from '@module-messenger/types/store.d';
import * as TypeHook from '@module-messenger/types/hook.d';

declare global {
    namespace App.ModuleMessenger {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
        export import Hook = TypeHook;
    }
}
