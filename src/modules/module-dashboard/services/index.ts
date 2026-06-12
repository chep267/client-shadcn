/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { DashboardApiPath } from '@module-dashboard/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class DashboardService extends ApiService {
    constructor(url = DashboardApiPath.root) {
        super(url);
    }

    public getAll = () => {
        return this.withDelay(
            this.get<App.ModuleDashboard.Api.TypeApi['GetAll']['Response']>({
                url: DashboardApiPath.tickets,
            })
        );
    };

    public update = (payload: App.ModuleDashboard.Api.TypeApi['Update']['Payload']) => {
        const { id, data } = payload;

        return this.withDelay(
            this.patch<App.ModuleDashboard.Api.TypeApi['Update']['Response']>(data, {
                url: `${DashboardApiPath.ticket}/${id}`,
            })
        );
    };

    public remove = (payload: App.ModuleDashboard.Api.TypeApi['Remove']['Payload']) => {
        const { id } = payload;

        return this.withDelay(
            this.delete({
                url: `${DashboardApiPath.ticket}/${id}`,
            })
        );
    };

    public getStatus = () => {
        return this.withDelay(
            this.get<App.ModuleDashboard.Api.TypeApi['GetStatus']['Response']>({
                url: DashboardApiPath.ticketStatus,
            })
        );
    };
}

export const dashboardService = new DashboardService();
