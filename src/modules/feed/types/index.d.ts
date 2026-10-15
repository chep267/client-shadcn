/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@modules/feed/types/data.d';
import * as TypeApi from '@modules/feed/types/api.d';

declare global {
    namespace App.ModuleFeed {
        export import Data = TypeData;
        export import Api = TypeApi;
    }
}
