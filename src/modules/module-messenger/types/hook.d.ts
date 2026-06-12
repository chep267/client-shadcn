/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
export type QueryResponse<Data = unknown> = {
    list: Data[];
    map: Map<string, Data>;
    metadata: App.ModuleBase.Api.ApiResponse<Data>['metadata'];
};
