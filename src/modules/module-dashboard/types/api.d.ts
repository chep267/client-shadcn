/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ItemIds, Items } from '@module-base/types/data.d';
import type { TicketData } from '@module-dashboard/types/data.d';

export interface TypeApi {
    Get: {
        Payload: {
            id: TicketData['id'];
        };
        Response: App.ModuleBase.Api.ApiResponse<void>;
    };
    GetAll: {
        Payload: void;
        Response: App.ModuleBase.Api.ApiResponse<{ itemIds: ItemIds; items: Items<TicketData> }>;
    };
    Update: {
        Payload: {
            id: TicketData['id'];
            data: { description: TicketData['description']; status: TicketData['status'] };
        };
        Response: App.ModuleBase.Api.ApiResponse<TicketData>;
    };
    Remove: {
        Payload: {
            id: TicketData['id'];
        };
        Response: App.ModuleBase.Api.ApiResponse<void>;
    };
    GetStatus: {
        Payload: void;
        Response: App.ModuleBase.Api.ApiResponse<ItemIds>;
    };
}
