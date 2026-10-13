/**
 *
 * @Dashboardor dongntd267@gmail.com
 *
 */

/** constants */
import { FeedApiPath } from '@module-feed/constants/path';

/** services */
import { ApiService } from '@module-base/services/api';

class FeedService extends ApiService {
    constructor(url = FeedApiPath.root) {
        super(url);
    }

    getOne = async (payload: App.ModuleFeed.Api.FeedService['Get']['Payload']) => {
        const { pid } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleFeed.Api.FeedService['Get']['Response']>({
                url: `${FeedApiPath.feed}/${pid}`,
            })
        );
        return response.data;
    };

    gets = async (payload: App.ModuleFeed.Api.FeedService['Gets']['Payload']) => {
        const { q = '', page = '1', skip = '0', limit = '20' } = payload;
        const response = await this.withDelay(
            this.get<App.ModuleFeed.Api.FeedService['Gets']['Response']>({
                url: FeedApiPath.feeds,
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

export const feedService = new FeedService();
