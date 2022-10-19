import useDebounce from "components/use-debounce";
import { useRouter } from "next/router";
import { useState } from "react";

const defaultPage = 1;
const defaultLimit = 10;
const defaultOrderBy = "createdAt";
const defaultSortOrder = "desc";
const defaultQuery = "";

const removeUndefined = (obj: Record<string, string | number | undefined>) =>
  Object.fromEntries(Object.entries(obj).filter(([, val]) => val != undefined));

const useDataTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(
    router.query.page ? parseInt(router.query.page as string) : defaultPage
  );
  const [limit, setLimit] = useState(
    router.query.limit ? parseInt(router.query.limit as string) : defaultLimit
  );
  const [query, setQuery] = useState(
    router.query.query ? (router.query.query as string) : defaultQuery
  );
  const [search, setSearch] = useState(query);
  const [orderBy, setOrderBy] = useState(
    router.query.orderBy ? (router.query.orderBy as string) : defaultOrderBy
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    if (router.query.sortOrder) {
      if (
        router.query.sortOrder === "asc" ||
        router.query.sortOrder === "desc"
      ) {
        return router.query.sortOrder;
      }
    }
    return defaultSortOrder;
  });

  const handleQueryChange = (values: {
    page?: number;
    limit?: number;
    sortOrder?: "asc" | "desc";
    orderBy?: string;
    query?: string;
  }) => {
    const newPage = values.page || page;
    const newLimit = values.limit || limit;
    const newOrderBy = values.orderBy || orderBy;
    const newSortOrder = values.sortOrder || sortOrder;
    const newQuery = values.query === undefined ? query : values.query;
    router.push(
      {
        pathname: router.pathname,
        query: removeUndefined({
          page: newPage === defaultPage ? undefined : newPage,
          limit: newLimit === defaultLimit ? undefined : newLimit,
          orderBy: newOrderBy === defaultOrderBy ? undefined : newOrderBy,
          sortOrder:
            newSortOrder === defaultSortOrder ? undefined : newSortOrder,
          query: newQuery === defaultQuery ? undefined : newQuery,
        }),
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleQueryChange({ page: newPage });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    handleQueryChange({ limit: newLimit });
  };

  const handleSort = (newOrderBy: string) => {
    if (orderBy === newOrderBy) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
      handleQueryChange({ sortOrder: newSortOrder });
    } else {
      setSortOrder("asc");
      setOrderBy(newOrderBy);
      handleQueryChange({ sortOrder: "asc", orderBy: newOrderBy });
    }
  };

  useDebounce(
    () => {
      setQuery(search);
      handleQueryChange({ query: search || "" });
    },
    [search],
    300
  );

  return {
    page,
    limit,
    search,
    sortOrder,
    orderBy,
    query,
    setPage,
    setLimit,
    setQuery,
    setSearch,
    setOrderBy,
    handlePageChange,
    handleLimitChange,
    handleSort,
  };
};

export default useDataTable;
