import { FC, useEffect, useState } from "react";
import { PokeListQueryParams, usePokemonListQuery } from "./usePokeListQuery";
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
  const [queryParams, setQueryParams] = useState<PokeListQueryParams>(() => {
    return {
      currentPage: StorageUtils.getLocalStorage<number>(
        CURRENT_PAGE_KEY,
        DEFAULT_CURRENT
      ),
      pageSize: StorageUtils.getLocalStorage<number>(
        PAGE_SIZE_KEY,
        DEFAULT_PAGE_SIZE
      ),
      selectedType: StorageUtils.getLocalStorage<string>(CURRENT_TYPE_KEY, ""),
      sortOrder: StorageUtils.getLocalStorage<"asc" | "desc">(
        SORT_ORDER_KEY,
        DEFAULT_SORT
      ),
    };
  });

  const handleTypeSelect = (type: string) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      selectedType: type ?? "",
    }));
  };

  useEffect(() => {
    StorageUtils.setLocalStorage(CURRENT_PAGE_KEY, queryParams.currentPage);
    StorageUtils.setLocalStorage(PAGE_SIZE_KEY, queryParams.pageSize);
    StorageUtils.setLocalStorage(CURRENT_TYPE_KEY, queryParams.selectedType);
    StorageUtils.setLocalStorage(SORT_ORDER_KEY, queryParams.sortOrder);
  }, [queryParams]);

  const { data, error, isLoading } = usePokemonListQuery(queryParams);

  if (error) return <Empty />;

  return (
    <StyledListWrapper>
      <PokeListControls
        queryParams={queryParams}
        handleTypeSelect={handleTypeSelect}
        setSortOrder={(order) =>
          setQueryParams((prevParams) => ({ ...prevParams, sortOrder: order }))
        }
        setCurrentPage={(page) =>
          setQueryParams((prevParams) => ({ ...prevParams, page }))
        }
        setPageSize={(size) =>
          setQueryParams((prevParams) => ({ ...prevParams, pageSize: size }))
        }
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
