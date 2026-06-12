/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@module-base/types/api.d';
import type { TypePoem } from '@module-poem/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api poem */
export interface PoemControllerAction {
    Get: {
        Payload: { pid: string };
        Response: ApiResponse<TypePoem>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<TypePoem[]>;
    };
}
