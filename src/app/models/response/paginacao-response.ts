export interface PaginationResponse<T> {
    totalPages: number,
    pageIndex: number,
    totalItens: number,
    itemsList: T[]
}