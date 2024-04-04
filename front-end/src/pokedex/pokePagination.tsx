import { Pagination, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { usePokemonListQuery } from "./usePokeListQuery";
import { PAGE_SIZES } from "./constants";
import styled from "styled-components";
const { Text } = Typography;

export const PokemonPagination: FC<{
  pageSize: number;
  currentPage: number;
  selectedType: string;
  sortOrder: "asc" | "desc";
  onPageChange: (page: number) => void;
  onPageSizeChange: (current: number, size: number) => void;
}> = ({
  pageSize,
  currentPage,
  selectedType,
  onPageChange,
  onPageSizeChange,
  sortOrder,
}) => {
  const { data } = usePokemonListQuery({
    page: currentPage,
    pageSize,
    pokeType: selectedType,
    sortOrder,
  });

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  useEffect(() => {
    if (data && data.metadata) {
      setTotalItemsCount(data.metadata.totalCount);
    }
  }, [data]);

  return (
    <StyledPagination
      total={totalItemsCount}
      showTotal={(total) => <Text strong>Total {total} Pokemons</Text>}
      defaultPageSize={pageSize}
      defaultCurrent={currentPage}
      pageSizeOptions={Object.values(PAGE_SIZES)}
      onChange={onPageChange}
      onShowSizeChange={onPageSizeChange}
      showSizeChanger
    />
  );
};

const StyledPagination = styled(Pagination)`
  flex: 1;
`;
