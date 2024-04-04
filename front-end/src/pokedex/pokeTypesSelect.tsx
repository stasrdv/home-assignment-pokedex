import { Select } from "antd";
import { usePokemonTypesQuery } from "./usePokeTypesQuery";
import { FC } from "react";

export const PokemonTypesSelect: FC<{
  handleTypeSelect: (type: string) => void;
  selectedType: string;
}> = ({ handleTypeSelect, selectedType }) => {
  const { data, error } = usePokemonTypesQuery();

  if (error) return <div>Error</div>;

  return (
    <Select
      style={{ width: 200 }}
      placeholder='Select Pokemon type'
      options={data?.map((option) => ({ label: option, value: option }))}
      onChange={handleTypeSelect}
      value={selectedType ? selectedType : undefined}
      allowClear
    />
  );
};
