/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as TypeData from '@module-base/types/data.d';
import * as TypeHook from '@module-base/types/hook.d';
import * as TypeStore from '@module-base/types/store.d';
import * as TypeComponent from '@module-base/types/component.d';

declare global {
    namespace App.ModuleBase {
        namespace Api {
            type Response<Data, Metadata = Record<string, any>> = {
                message: string;
                data: Data;
                metadata: { timestamp: number } & Metadata;
            };
        }
        export import Data = TypeData;
        export import Store = TypeStore;
        export import Hook = TypeHook;
        export import Component = TypeComponent;
    }
}
