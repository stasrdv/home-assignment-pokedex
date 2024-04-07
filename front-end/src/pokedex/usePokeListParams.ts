import { useState, useEffect } from "react";
import { StorageUtils } from "../utils";

import { PokeListQueryParams } from "./types/poke-query-params";

export const usePokeListQueryParams = (): [
  PokeListQueryParams,
  (params: Partial<PokeListQueryParams>) => void
] => {
  const [queryParams, setQueryParams] = useState<PokeListQueryParams>(() => {
    return {
      currentPage: StorageUtils.getLocalStorage<number>(
        CURRENT_PAGE_KEY,
        DEFAULT_CURRENT
      ),
      pageSize: StorageUtils.getLocalStorage<number>(
        PAGE_SIZE_KEY,
        DEFAULT_PAGE_SIZE
      ),
      selectedType: StorageUtils.getLocalStorage<string>(CURRENT_TYPE_KEY, ""),
      sortOrder: StorageUtils.getLocalStorage<"asc" | "desc">(
        SORT_ORDER_KEY,
        DEFAULT_SORT
      ),
    };
  });

  useEffect(() => {
    StorageUtils.setLocalStorage(CURRENT_PAGE_KEY, queryParams.currentPage);
    StorageUtils.setLocalStorage(PAGE_SIZE_KEY, queryParams.pageSize);
    StorageUtils.setLocalStorage(CURRENT_TYPE_KEY, queryParams.selectedType);
    StorageUtils.setLocalStorage(SORT_ORDER_KEY, queryParams.sortOrder);
  }, [queryParams]);

  const updateQueryParams = (params: Partial<PokeListQueryParams>) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...params,
    }));
  };

  return [queryParams, updateQueryParams];
};

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_CURRENT = 1;
const DEFAULT_SORT = "asc";
const PAGE_SIZE_KEY = "pageSize";
const CURRENT_PAGE_KEY = "currentPage";
const CURRENT_TYPE_KEY = "currentType";
const SORT_ORDER_KEY = "sortOrder";
