/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ItemIds, Items } from '@module-base/types/data.d';
import type { TypeTicketData } from '@module-dashboard/types/data.d';

export interface TypeApi {
    Get: {
        Payload: {
            id: TypeTicketData['id'];
        };
        Response: App.ModuleBase.Api.ApiResponse<void>;
    };
    GetAll: {
        Payload: void;
        Response: App.ModuleBase.Api.ApiResponse<{ itemIds: ItemIds; items: Items<TypeTicketData> }>;
    };
    Update: {
        Payload: {
            id: TypeTicketData['id'];
            data: { description: TypeTicketData['description']; status: TypeTicketData['status'] };
        };
        Response: App.ModuleBase.Api.ApiResponse<TypeTicketData>;
    };
    Remove: {
        Payload: {
            id: TypeTicketData['id'];
        };
        Response: App.ModuleBase.Api.ApiResponse<void>;
    };
    GetStatus: {
        Payload: void;
        Response: App.ModuleBase.Api.ApiResponse<ItemIds>;
    };
}
