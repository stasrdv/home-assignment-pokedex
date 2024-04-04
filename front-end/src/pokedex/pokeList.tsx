import { FC, useEffect, useState } from "react";
import { usePokemonListQuery } from "./usePokeListQuery";
import styled from "styled-components";
import { Empty, List } from "antd";
import { PokemonListItem } from "./pokeListItem";

import {
  PAGE_SIZE_KEY,
  DEFAULT_PAGE_SIZE,
  CURRENT_PAGE_KEY,
  DEFAULT_CURRENT,
  CURRENT_TYPE_KEY,
  DEFAULT_SORT,
  SORT_ORDER_KEY,
} from "./constants";

import { PokeListControls } from "./pokeListControls";
import { StorageUtils } from "../utils";

export const PokemonList: FC = () => {
  const [pageSize, setPageSize] = useState(() => {
    return StorageUtils.getLocalStorage<number>(
      PAGE_SIZE_KEY,
      DEFAULT_PAGE_SIZE
    );
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return StorageUtils.getLocalStorage(CURRENT_PAGE_KEY, DEFAULT_CURRENT);
  });

  const [selectedType, setSelectedType] = useState(() => {
    return StorageUtils.getLocalStorage<string>(CURRENT_TYPE_KEY, "");
  });

  const [sortOrder, setSortOrder] = useState(() => {
    return StorageUtils.getLocalStorage<"asc" | "desc">(
      SORT_ORDER_KEY,
      DEFAULT_SORT
    );
  });

  const handleTypeSelect = (type: string) => {
    setSelectedType(type ?? "");
  };

  useEffect(() => {
    StorageUtils.setLocalStorage(PAGE_SIZE_KEY, pageSize);
    StorageUtils.setLocalStorage(CURRENT_PAGE_KEY, currentPage);
    StorageUtils.setLocalStorage(CURRENT_TYPE_KEY, selectedType);
    StorageUtils.setLocalStorage(SORT_ORDER_KEY, sortOrder);
  }, [pageSize, currentPage, selectedType, sortOrder]);

  const { data, error, isLoading } = usePokemonListQuery({
    page: currentPage,
    pageSize,
    pokeType: selectedType,
    sortOrder,
  });

  if (error) return <Empty />;

  return (
    <StyledListWrapper>
      <PokeListControls
        pageSize={pageSize}
        currentPage={currentPage}
        selectedType={selectedType}
        handleTypeSelect={handleTypeSelect}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
      <List
        className='list'
        loading={isLoading}
        itemLayout='horizontal'
        dataSource={data?.list}
        renderItem={(pokemon) => (
          <PokemonListItem key={pokemon.name} pokemon={pokemon} />
        )}
      />
    </StyledListWrapper>
  );
};

const StyledListWrapper = styled.div`
  overflow-y: hidden;
  flex-grow: 1;
  padding: 24px 16px;
  display: flex;
  flex-flow: column;
  gap: 16px;

  > .list {
    overflow-y: auto;
  }
`;
