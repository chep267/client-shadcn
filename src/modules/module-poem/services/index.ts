/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { PoemApiPath } from '@module-poem/constants/path';

/** services */
import { BaseService } from '@module-base/services';

class PoemService extends BaseService {
    constructor(url = PoemApiPath.root) {
        super(url);
    }

    public getPoems = async () => {
        const response = await this.withDelay(
            this.get<App.ModulePoem.Api.TypeApi['GetPoems']['Response']>({
                url: PoemApiPath.poems,
            })
        );
        return response.data.data;
    };
}

export const poemService = new PoemService();
