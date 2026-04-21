/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@module-poem/types/data.d';
import * as TypeApi from '@module-poem/types/api.d';

declare global {
    namespace App.ModulePoem {
        export import Data = TypeData;
        export import Api = TypeApi;
    }
}
