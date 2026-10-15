/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@modules/messenger/types/data.d';
import * as TypeApi from '@modules/messenger/types/api.d';
import * as TypeStore from '@modules/messenger/types/store.d';

declare global {
    namespace App.ModuleMessenger {
        export import Data = TypeData;
        export import Api = TypeApi;
        export import Store = TypeStore;
    }
}
