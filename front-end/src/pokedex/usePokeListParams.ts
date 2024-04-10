import { useNavigate, useSearchParams } from "react-router-dom";
import { PokeListQueryParams } from "./types/poke-query-params";
import { useState, useEffect } from "react";

export const usePokeListQueryParams = (): PokeListQueryParams => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || "1"
  );
  const [pageSize, setPageSize] = useState(
    searchParams.get("page_size") || "10"
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get("poke_type") || ""
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("poke_type") || ""
  );

  useEffect(() => {
    setCurrentPage(searchParams.get("page") || "1");
    setPageSize(searchParams.get("page_size") || "10");
    setSelectedType(searchParams.get("poke_type") || "");
    setSortOrder(searchParams.get("sort_order") || "asc");
  }, [searchParams]);

  const updateSearchParams = (
    page: string,
    size: string,
    type: string,
    sortOrder: string
  ) => {
    console.log(size);
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    params.set("page_size", size);
    params.set("poke_type", type ?? "");
    params.set("sort_order", sortOrder);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return {
    currentPage,
    pageSize,
    sortOrder,
    selectedType,
    setCurrentPage: (updatedPage: string) =>
      updateSearchParams(updatedPage, pageSize, selectedType, sortOrder),
    setPageSize: (updatedSize: string) =>
      updateSearchParams(currentPage, updatedSize, selectedType, sortOrder),
    setSelectedType: (updatedType: string) =>
      updateSearchParams(currentPage, pageSize, updatedType, sortOrder),
    setSortOrder: (updatedOrder: string) =>
      updateSearchParams(currentPage, pageSize, selectedType, updatedOrder),
  };
};
