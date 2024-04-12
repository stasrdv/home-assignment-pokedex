import {
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import { PokemonPagination } from "./pokePagination";
import { PokemonTypesSelect } from "./pokeTypesSelect";
import styled from "styled-components";
import { usePokeListQueryParams } from "./usePokeListParams";

export const PokeListControls: FC = () => {
  const { queryParams, updateQueryParams } = usePokeListQueryParams();
  return (
    <StyledControl>
      <PokemonPagination />
      <Button.Group>
        <Button
          icon={<SortDescendingOutlined />}
          onClick={() => updateQueryParams({ sortOrder: "desc" })}
          type={queryParams.sortOrder === "desc" ? "primary" : "default"}
        >
          Descending
        </Button>
        <Button
          icon={<SortAscendingOutlined />}
          onClick={() => updateQueryParams({ sortOrder: "asc" })}
          type={queryParams.sortOrder === "asc" ? "primary" : "default"}
        >
          Ascending
        </Button>
      </Button.Group>

      <PokemonTypesSelect
        handleTypeSelect={(selectedType) => updateQueryParams({ selectedType })}
        selectedType={queryParams.selectedType}
      />
    </StyledControl>
  );
};

const StyledControl = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-radius: 4px;
`;
