import { FC } from "react";
import { usePokemonListQuery } from "./usePokeListQuery";
import styled from "styled-components";
import { Empty, List } from "antd";
import { PokemonListItem } from "./pokeListItem";
import { PokeListControls } from "./pokeListControls";
import { usePokeListQueryParams } from "./usePokeListParams";

export const PokemonList: FC = () => {
  const queryParams = usePokeListQueryParams();
  const { data, error, isLoading } = usePokemonListQuery(queryParams);
  if (error) return <Empty />;

  return (
    <StyledListWrapper>
      <PokeListControls />
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
