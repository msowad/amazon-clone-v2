import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminLayout } from "components";
import { DataTable, useDataTable } from "datatable";
import Link from "next/link";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { ProductResponse } from "server/router/product-router";
import { defaultDateFormatOptions, handleFormError } from "utils";
import { trpc } from "utils/trpc";

const columnHelper = createColumnHelper<ProductResponse>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("price", { header: "Price" }),
  columnHelper.accessor("stock", { header: "Stock" }),
  columnHelper.accessor("shortDescription", {
    header: "Short Description",
    cell: (props) => props.getValue().substring(0, 10),
  }),
  columnHelper.accessor("categories", {
    header: "Categories",
    cell: (props) => {
      const categories = props.getValue();
      const names = categories.map((c, i) => (
        <Link key={c.id} href={`/admin/categories/${c.slug}/edit`} passHref>
          <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            {c.name}
            {i !== categories.length - 1 && ", "}
          </a>
        </Link>
      ));
      return names;
      console.log({ names });
      return <Link href="/">c</Link>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (props) =>
      props.getValue().toLocaleDateString("en-US", defaultDateFormatOptions),
  }),
];

const Index = () => {
  const {
    page,
    limit,
    orderBy,
    sortOrder,
    query,
    search,
    setSearch,
    handleLimitChange,
    handlePageChange,
    handleSort,
    setQuery,
  } = useDataTable();

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    "product.getAll",
    { page, limit, orderBy, sortOrder, query },
  ]);

  const table = useReactTable({
    data: data ? data[1] : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { mutateAsync: deleteProduct } = trpc.useMutation(
    "admin.product.delete",
    {
      onSuccess() {
        utils.invalidateQueries(["product.getAll"]);
      },
    }
  );

  const onDelete = useCallback(
    async (id: string) => {
      toast.promise(deleteProduct(id), {
        loading: "Deleting...",
        success: "Product deleted successfully",
        error: (e) => handleFormError(e),
      });
    },
    [deleteProduct]
  );

  return (
    <AdminLayout>
      <DataTable
        title="Product"
        createButtonLink="/admin/products/create"
        data={data ? data[1] : []}
        isLoading={isLoading}
        limit={limit}
        onDelete={(original) => onDelete(original.id)}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
        onSearch={(q) => setSearch(q)}
        onSearchSubmit={() => setQuery(search)}
        onSort={handleSort}
        orderBy={orderBy}
        page={page}
        search={search}
        sortOrder={sortOrder}
        table={table}
        totalCount={data ? data[0] : 0}
        renderEditUrl={(original) => `/admin/products/${original.slug}/edit`}
      />
    </AdminLayout>
  );
};

export default Index;
