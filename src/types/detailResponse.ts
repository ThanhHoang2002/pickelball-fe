export interface Meta {
  page: number
  pageSize: number
  pages: number
  total: number
}

export interface DetailResponse<T> {
  meta: Meta
  result: T
}
