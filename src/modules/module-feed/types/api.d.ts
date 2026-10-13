/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@module-base/types/api.d';
import type { TypeFeed } from '@module-feed/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api feed */
export interface FeedService {
    Get: {
        Payload: { pid: string };
        Response: ApiResponse<TypeFeed>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<TypeFeed[]>;
    };
}
