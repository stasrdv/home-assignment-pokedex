import {
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import { PokemonPagination } from "./pokePagination";
import { PokemonTypesSelect } from "./pokeTypesSelect";
import styled from "styled-components";

export const PokeListControls: FC<{
  pageSize: number;
  currentPage: number;
  selectedType: string;
  handleTypeSelect: (type: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (page: number) => void;
}> = ({
  pageSize,
  currentPage,
  selectedType,
  handleTypeSelect,
  sortOrder,
  setSortOrder,
  setCurrentPage,
  setPageSize,
}) => {
  const handlePageSizeChange = (_: number, size: number) => {
    setPageSize(size);
  };

  return (
    <StyledControl>
      <PokemonPagination
        pageSize={pageSize}
        currentPage={currentPage}
        selectedType={selectedType}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        sortOrder={sortOrder}
      />
      <Button.Group>
        <Button
          icon={<SortDescendingOutlined />}
          onClick={() => setSortOrder("desc")}
          type={sortOrder === "desc" ? "primary" : "default"}
        >
          Descending
        </Button>
        <Button
          icon={<SortAscendingOutlined />}
          onClick={() => setSortOrder("asc")}
          type={sortOrder === "asc" ? "primary" : "default"}
        >
          Ascending
        </Button>
      </Button.Group>

      <PokemonTypesSelect
        handleTypeSelect={handleTypeSelect}
        selectedType={selectedType}
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
