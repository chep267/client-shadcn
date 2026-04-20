/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { DashboardApiPath } from '@module-dashboard/constants/DashboardApiPath';

/** services */
import { BaseService } from '@module-base/services';

class DashboardService extends BaseService {
    constructor(url = DashboardApiPath.root) {
        super(url);
    }

    public getAll = () => {
        return this.withDelay(
            this.get<App.ModuleDashboard.Api.TypeApiDashboard['GetAll']['Response']>({
                url: DashboardApiPath.tickets,
            })
        );
    };

    public update = (payload: App.ModuleDashboard.Api.TypeApiDashboard['Update']['Payload']) => {
        const { id, data } = payload;

        return this.withDelay(
            this.patch<App.ModuleDashboard.Api.TypeApiDashboard['Update']['Response']>(data, {
                url: `${DashboardApiPath.ticket}/${id}`,
            })
        );
    };

    public remove = (payload: App.ModuleDashboard.Api.TypeApiDashboard['Remove']['Payload']) => {
        const { id } = payload;

        return this.withDelay(
            this.delete({
                url: `${DashboardApiPath.ticket}/${id}`,
            })
        );
    };

    public getStatus = () => {
        return this.withDelay(
            this.get<App.ModuleDashboard.Api.TypeApiDashboard['GetStatus']['Response']>({
                url: DashboardApiPath.ticketStatus,
            })
        );
    };
}

export const dashboardService = new DashboardService();
