import { useNavigate, useSearchParams } from "react-router-dom";
import { PokeListQueryParams } from "./types/poke-query-params";
import { useState, useEffect } from "react";

export const usePokeListQueryParams = (): PokeListParams => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getPageOrDefault = (param: string, defaultValue: number | string) => {
    const value = searchParams.get(param);
    return value ? parseInt(value, 10) : defaultValue;
  };

  const [pagination, setPagination] = useState({
    currentPage: getPageOrDefault("page", 1),
    pageSize: getPageOrDefault("page_size", 10),
  });
  const [selectedType, setSelectedType] = useState(
    searchParams.get("poke_type") || ""
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    searchParams.get("sort_order") === "desc" ? "desc" : "asc"
  );

  useEffect(() => {
    setPagination({
      currentPage: getPageOrDefault("page", 1),
      pageSize: getPageOrDefault("page_size", 10),
    });
    setSelectedType(searchParams.get("poke_type") || "");
    setSortOrder(searchParams.get("sort_order") === "desc" ? "desc" : "asc");
  }, [searchParams]);

  const updateSearchParams = (
    page: number,
    size: number,
    type: string,
    sortOrder: "asc" | "desc"
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    params.set("page_size", String(size));
    params.set("poke_type", type || "");
    params.set("sort_order", sortOrder);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return {
    currentPage: +pagination.currentPage,
    pageSize: +pagination.pageSize,
    sortOrder,
    selectedType,
    setPagination: (updatedPage: number, updatedPageSize: number) =>
      updateSearchParams(updatedPage, updatedPageSize, selectedType, sortOrder),
    setSelectedType: (updatedType: string) =>
      updateSearchParams(
        +pagination.currentPage,
        +pagination.pageSize,
        updatedType,
        sortOrder
      ),
    setSortOrder: (updatedOrder: "asc" | "desc") =>
      updateSearchParams(
        +pagination.currentPage,
        +pagination.pageSize,
        selectedType,
        updatedOrder
      ),
  };
};

interface PokeListParams extends PokeListQueryParams {
  currentPage: number;
  pageSize: number;
  selectedType: string;
  sortOrder: "asc" | "desc";
  setPagination: (updatedPage: number, updatedPageSize: number) => void;
  setSelectedType: (updatedType: string) => void;
  setSortOrder: (updatedOrder: "asc" | "desc") => void;
}
