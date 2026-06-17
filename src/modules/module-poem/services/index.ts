/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { PoemApiPath } from '@module-poem/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class PoemService extends ApiService {
    constructor(url = PoemApiPath.root) {
        super(url);
    }

    getOne = async (payload: App.ModulePoem.Api.PoemService['Get']['Payload']) => {
        const { pid } = payload;
        const response = await this.withDelay(
            this.get<App.ModulePoem.Api.PoemService['Get']['Response']>({
                url: `${PoemApiPath.poem}/${pid}`,
            })
        );
        return response.data;
    };

    gets = async (payload: App.ModulePoem.Api.PoemService['Gets']['Payload']) => {
        const { q = '', page = '1', skip = '0', limit = '20' } = payload;
        const response = await this.withDelay(
            this.get<App.ModulePoem.Api.PoemService['Gets']['Response']>({
                url: PoemApiPath.poems,
                params: {
                    q,
                    page,
                    skip,
                    limit,
                },
            })
        );
        return response.data.data;
    };
}

export const poemService = new PoemService();
