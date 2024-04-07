export type PokeListQueryParams = {
  currentPage: number;
  pageSize: number;
  selectedType: string;
  sortOrder: "asc" | "desc";
};
