import { useNavigate, useSearchParams } from "react-router-dom";
import { PokeListQueryParams } from "./types/poke-query-params";
import { useState, useEffect } from "react";

const DEFAULT_PAGE_SIZE: number = 10;
const DEFAULT_PAGE: number = 1;
const DEFAULT_SORT_ORDER: "asc" | "desc" = "asc";

export const usePokeListQueryParams = (): PokeListParams => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<PokeListParams["queryParams"]>(
    {
      currentPage: parseInt(searchParams.get("page") || String(DEFAULT_PAGE)),
      pageSize: parseInt(
        searchParams.get("page_size") || String(DEFAULT_PAGE_SIZE)
      ),
      selectedType: searchParams.get("poke_type") || "",
      sortOrder:
        searchParams.get("sort_order") === "desc" ? "desc" : DEFAULT_SORT_ORDER,
    }
  );

  useEffect(() => {
    setQueryParams({
      currentPage: parseInt(searchParams.get("page") || String(DEFAULT_PAGE)),
      pageSize: parseInt(
        searchParams.get("page_size") || String(DEFAULT_PAGE_SIZE)
      ),
      selectedType: searchParams.get("poke_type") || "",
      sortOrder:
        searchParams.get("sort_order") === "desc" ? "desc" : DEFAULT_SORT_ORDER,
    });
  }, [searchParams]);

  const updateSearchParams = (updatedParams: Partial<PokeListQueryParams>) => {
    const { currentPage, pageSize, selectedType, sortOrder } = updatedParams;
    // using multiple if statements for each parameter is not scalable and violates the DRY (Don't Repeat Yourself) principle.
    searchParams.set("page", String(currentPage || DEFAULT_PAGE));
    searchParams.set("page_size", String(pageSize || DEFAULT_PAGE_SIZE));
    selectedType ? searchParams.set("poke_type", selectedType || "") : null;
    searchParams.set("sort_order", sortOrder || DEFAULT_SORT_ORDER);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return {
    queryParams,
    updateQueryParams: (updatedParams: Partial<PokeListQueryParams>) =>
      updateSearchParams(updatedParams),
  };
};

interface PokeListParams {
  queryParams: PokeListQueryParams;
  updateQueryParams: (updatedParams: Partial<PokeListQueryParams>) => void;
}
