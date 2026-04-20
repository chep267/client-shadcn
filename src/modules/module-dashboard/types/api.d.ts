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
        Payload: {
            id: TypeTicketData['id'];
        };
        Response: App.ModuleBase.Api.Response<void>;
    };
    GetAll: {
        Payload: void;
        Response: App.ModuleBase.Api.Response<{ itemIds: TypeItemIds; items: TypeItems<TypeTicketData> }>;
    };
    Update: {
        Payload: {
            id: TypeTicketData['id'];
            data: { description: TypeTicketData['description']; status: TypeTicketData['status'] };
        };
        Response: App.ModuleBase.Api.Response<TypeTicketData>;
    };
    Remove: {
        Payload: {
            id: TypeTicketData['id'];
        };
        Response: App.ModuleBase.Api.Response<void>;
    };
    GetStatus: {
        Payload: void;
        Response: App.ModuleBase.Api.Response<TypeItemIds>;
    };
}
