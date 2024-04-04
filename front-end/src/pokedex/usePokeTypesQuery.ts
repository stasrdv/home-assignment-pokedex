import { UseQueryResult, useQuery } from "react-query";
import { CACHE_DURATION } from "./constants";

const API_URL = await import.meta.env.VITE_API_URL;

export const usePokemonTypesQuery = (): UseQueryResult<string[]> => {
  return useQuery(
    ["pokemonTypesList"],
    async () => {
      const response = await fetch(`${API_URL}/types`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    },
    {
      staleTime: CACHE_DURATION,
    }
  );
};
