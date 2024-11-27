export interface PageInfo<T> {
  data: T[]
  pagination: PaginationMetadata
}

export interface PaginationMetadata {
  totalData: number
  totalPage: number
  currentPage: number
  pageSize: number
}
