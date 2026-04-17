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

    public remove = (id: string) => {
        return this.withDelay(
            this.delete({
                url: `${DashboardApiPath.ticket}/${id}`,
            })
        );
    };
}

export const dashboardService = new DashboardService();
