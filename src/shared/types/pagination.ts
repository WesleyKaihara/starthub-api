export type PaginationOptions = {
  page: number;
  limit: number;
};

export interface Pagination<T> {
  itens: T[];
  total?: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
}
