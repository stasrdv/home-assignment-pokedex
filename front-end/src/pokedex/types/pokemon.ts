export type Pokemon = {
  number: number;
  name: string;
  type_one: string;
  type_two: string;
  total: number;
  hit_points: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  generation: number;
  legendary: boolean;
};

export type PokeListQueryParams = {
  page: number;
  pageSize: number;
  pokeType: string;
  sortOrder: "asc" | "desc";
};
