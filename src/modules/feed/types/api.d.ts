/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@modules/base/types/api.d';
import type { TypeFeed } from '@modules/feed/types/data.d';

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
