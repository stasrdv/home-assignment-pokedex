import { UseQueryResult, useQuery } from "react-query";
import { Pokemon } from "./types/pokemon";
import { CACHE_DURATION } from "./constants";
const API_URL = await import.meta.env.VITE_API_URL;

export const usePokemonListQuery = (
  queryParams: PokeListQueryParams
): UseQueryResult<PokemonListResponse> => {
  const { currentPage, pageSize, selectedType, sortOrder } = queryParams;
  const urlSearchParams = new URLSearchParams({
    page: currentPage.toString(),
    page_size: pageSize.toString(),
    poke_type: selectedType,
    sort_order: sortOrder,
  });
  return useQuery(
    ["pokemonsList", currentPage, pageSize, selectedType, sortOrder],
    async () => {
      const response = await fetch(`${API_URL}/?${urlSearchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      return mapResponseToPokemonList(responseData);
    },
    {
      staleTime: CACHE_DURATION,
    }
  );
};

function mapResponseToPokemonList(responseData: {
  list: Pokemon[];
  metadata: { total_count: number };
}): PokemonListResponse {
  const {
    list,
    metadata: { total_count: totalCount },
  } = responseData;
  return { list, metadata: { totalCount } };
}

type PokemonListResponse = {
  list: Pokemon[];
  metadata: { totalCount: number };
};

export type PokeListQueryParams = {
  currentPage: number;
  pageSize: number;
  selectedType: string;
  sortOrder: "asc" | "desc";
};
