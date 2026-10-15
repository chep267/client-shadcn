/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type Data = unknown;
export type Metadata = Record<string, unknown>;
export type SearchMetadata<M = Metadata> = M & {
    currentItems: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
};
export type Param = Record<string, string | number>;

export type SearchParam<P = Param> = P & {
    q?: string;
    page?: string | number;
    skip?: string | number;
    limit?: string | number;
};

export interface SearchResponse<D = Data, M = Metadata> {
    data: D;
    metadata: SearchMetadata<M>;
}

export interface ApiResponse<D = Data, M = Metadata> {
    message: string;
    data: D;
    metadata: M;
}

export type ApiSearchResponse<D = Data, M = Metadata> = SearchResponse<D, M> & {
    message: string;
};
