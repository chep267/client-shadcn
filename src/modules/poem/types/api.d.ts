/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ApiResponse, SearchParam, ApiSearchResponse } from '@modules/base/types/api.d';
import type { TypePoem } from '@modules/poem/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** api poem */
export interface PoemService {
    Get: {
        Payload: { pid: string };
        Response: ApiResponse<TypePoem>;
    };
    Gets: {
        Payload: SearchParam;
        Response: ApiSearchResponse<TypePoem[]>;
    };
}
