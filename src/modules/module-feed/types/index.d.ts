/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@module-feed/types/data.d';
import * as TypeApi from '@module-feed/types/api.d';

declare global {
    namespace App.ModuleFeed {
        export import Data = TypeData;
        export import Api = TypeApi;
    }
}
