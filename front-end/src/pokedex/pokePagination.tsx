import { Pagination, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { usePokemonListQuery } from "./usePokeListQuery";

import styled from "styled-components";
import { usePokeListQueryParams } from "./usePokeListParams";
const { Text } = Typography;

export const PokemonPagination: FC = () => {
  const queryParams = usePokeListQueryParams();
  const { data, isLoading } = usePokemonListQuery(queryParams);
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
      defaultPageSize={queryParams.pageSize}
      defaultCurrent={queryParams.currentPage}
      pageSizeOptions={Object.values(PAGE_SIZES)}
      onChange={(size) => queryParams.setCurrentPage(size)}
      onShowSizeChange={(_, size) => queryParams.setPageSize(size)}
      showSizeChanger
      disabled={isLoading}
    />
  );
};

const StyledPagination = styled(Pagination)`
  flex: 1;
`;

const PAGE_SIZES = {
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
  EXTRA_LARGE: 30,
};
