/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types/data';
import type { TypeTicketData } from '@module-dashboard/types/data';

export interface TypeApiDashboard {
    Get: {
        Payload: { id: string };
        Response: App.ModuleBase.Api.Response<void>;
    };
    GetAll: {
        Payload: void;
        Response: App.ModuleBase.Api.Response<{ itemIds: TypeItemIds; items: TypeItems<TypeTicketData> }>;
    };
    Remove: {
        Payload: { id: string };
        Response: App.ModuleBase.Api.Response<void>;
    };
}
