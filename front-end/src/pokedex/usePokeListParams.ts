import { useNavigate, useSearchParams } from "react-router-dom";
import { PokeListQueryParams } from "./types/poke-query-params";
import { useState, useEffect } from "react";

export const usePokeListQueryParams = (): PokeListParams => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [queryParams, setQueryParams] = useState<PokeListParams["queryParams"]>(
    {
      currentPage: parseInt(searchParams.get("page") || "1", 10),
      pageSize: parseInt(searchParams.get("page_size") || "10", 10),
      selectedType: searchParams.get("poke_type") || "",
      sortOrder: searchParams.get("sort_order") === "desc" ? "desc" : "asc",
    }
  );

  useEffect(() => {
    setQueryParams({
      currentPage: parseInt(searchParams.get("page") || "1", 10),
      pageSize: parseInt(searchParams.get("page_size") || "10", 10),
      selectedType: searchParams.get("poke_type") || "",
      sortOrder: searchParams.get("sort_order") === "desc" ? "desc" : "asc",
    });
  }, [searchParams]);

  const updateSearchParams = (updatedParams: Partial<PokeListQueryParams>) => {
    const existingParams = searchParams;
    const updatedSearchParameters = new URLSearchParams(
      existingParams.toString()
    );
    if (updatedParams.currentPage !== undefined) {
      updatedSearchParameters.set("page", String(updatedParams.currentPage));
    }
    if (updatedParams.pageSize !== undefined) {
      updatedSearchParameters.set("page_size", String(updatedParams.pageSize));
    }
    updatedSearchParameters.set("poke_type", updatedParams.selectedType || "");
    if (updatedParams.sortOrder !== undefined) {
      updatedSearchParameters.set("sort_order", updatedParams.sortOrder);
    }

    const newSearchParamsString = updatedSearchParameters.toString();
    const newUrl = `${window.location.pathname}${
      newSearchParamsString ? `?${newSearchParamsString}` : ""
    }`;

    navigate(newUrl, { replace: true });
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
