/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types/data.d';
import type { TypePoem } from '@module-poem/types/data.d';

export interface TypeApi {
    GetPoems: {
        Payload: void;
        Response: App.ModuleBase.Api.Response<{ itemIds: TypeItemIds; items: TypeItems<TypePoem> }>;
    };
}
