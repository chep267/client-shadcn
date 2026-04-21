/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { PoemApiPath } from '@module-poem/constants/PoemApiPath';

/** services */
import { BaseService } from '@module-base/services';

class PoemService extends BaseService {
    constructor(url = PoemApiPath.root) {
        super(url);
    }

    public getAll = () => {
        return this.withDelay(
            this.get<App.ModulePoem.Api.TypeApiPoem['GetAll']['Response']>({
                url: PoemApiPath.poems,
            })
        );
    };
}

export const poemService = new PoemService();
