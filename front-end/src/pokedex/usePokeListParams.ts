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
      currentPage: parseInt(
        searchParams.get("page") || String(DEFAULT_PAGE),
        10
      ),
      pageSize: parseInt(
        searchParams.get("page_size") || String(DEFAULT_PAGE_SIZE),
        10
      ),
      selectedType: searchParams.get("poke_type") || "",
      sortOrder:
        searchParams.get("sort_order") === "desc" ? "desc" : DEFAULT_SORT_ORDER,
    }
  );

  useEffect(() => {
    setQueryParams({
      currentPage: parseInt(
        searchParams.get("page") || String(DEFAULT_PAGE),
        10
      ),
      pageSize: parseInt(
        searchParams.get("page_size") || String(DEFAULT_PAGE_SIZE),
        10
      ),
      selectedType: searchParams.get("poke_type") || "",
      sortOrder:
        searchParams.get("sort_order") === "desc" ? "desc" : DEFAULT_SORT_ORDER,
    });
  }, [searchParams]);

  const updateSearchParams = (updatedParams: Partial<PokeListQueryParams>) => {
    const searchParams = new URLSearchParams(location.search);

    if (updatedParams.currentPage) {
      searchParams.set("page", String(updatedParams.currentPage));
    } else {
      searchParams.set("page", String(DEFAULT_PAGE));
    }
    if (updatedParams.pageSize) {
      searchParams.set("page_size", String(updatedParams.pageSize));
    } else {
      searchParams.set("page_size", String(DEFAULT_PAGE_SIZE));
    }
    if (updatedParams.selectedType) {
      searchParams.set("poke_type", updatedParams.selectedType || "");
    } else {
      searchParams.delete("poke_type");
    }

    if (updatedParams.sortOrder) {
      searchParams.set(
        "sort_order",
        updatedParams.sortOrder || DEFAULT_SORT_ORDER
      );
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString() || undefined,
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
