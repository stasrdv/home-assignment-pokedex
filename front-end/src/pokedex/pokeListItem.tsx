import { Avatar, List, Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { Pokemon } from "./types/pokemon";
const { Text } = Typography;

export const PokemonListItem: FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const POKEMON_SPRITE_URL = "https://img.pokemondb.net/sprites/silver/normal/";
  return (
    <List.Item key={pokemon.name}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={`${POKEMON_SPRITE_URL}${pokemon.name.toLocaleLowerCase()}.png`}
            alt={pokemon.name}
          />
        }
        title={<Text mark>{pokemon.name}</Text>}
        description={
          <StyledDescription>
            {Object.entries(pokemon).map(
              ([key, value]) =>
                value && (
                  <div key={key}>
                    <Text strong>{capitalizeFirstLetter(key)}: </Text>
                    <Text>{value}</Text>
                  </div>
                )
            )}
          </StyledDescription>
        }
      />
    </List.Item>
  );
};

const StyledDescription = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;

  span {
    color: ${({ theme }) => theme.text};
  }
`;
function capitalizeFirstLetter(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}
