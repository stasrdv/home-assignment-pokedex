import { Select } from "antd";
import { usePokemonTypesQuery } from "./usePokeTypesQuery";
import { FC, useMemo } from "react";

export const PokemonTypesSelect: FC<{
  handleTypeSelect: (type: string) => void;
  selectedType: string;
}> = ({ handleTypeSelect, selectedType }) => {
  const { data, error } = usePokemonTypesQuery();
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((type) => type.trim() !== "");
  }, [data]);

  if (error) return <div>Error</div>;

  return (
    <Select
      style={{ width: 200 }}
      placeholder='Select Pokemon type'
      options={filteredData?.map((option) => ({
        label: option,
        value: option,
      }))}
      onChange={handleTypeSelect}
      value={selectedType ? selectedType : undefined}
      allowClear
    />
  );
};
