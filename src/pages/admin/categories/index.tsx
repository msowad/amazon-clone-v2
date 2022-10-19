import { Category } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminLayout } from "components";
import { useDataTable, DataTable } from "datatable";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { defaultDateFormatOptions, handleFormError } from "utils";
import { trpc } from "utils/trpc";

const columnHelper = createColumnHelper<Category>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
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
    "category.getAll",
    { page, limit, orderBy, sortOrder, query },
  ]);

  const table = useReactTable({
    data: data ? data[1] : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { mutateAsync: deleteCategory } = trpc.useMutation(
    "admin.category.delete",
    {
      onSuccess() {
        utils.invalidateQueries(["category.getAll"]);
      },
    }
  );

  const onDelete = useCallback(
    async (id: string) => {
      toast.promise(deleteCategory(id), {
        loading: "Deleting...",
        success: "Category deleted successfully",
        error: (e) => handleFormError(e),
      });
    },
    [deleteCategory]
  );

  return (
    <AdminLayout>
      <DataTable
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
        title="Category"
        totalCount={data ? data[0] : 0}
        renderEditUrl={(original) => `/admin/categories/${original.slug}/edit`}
      />
    </AdminLayout>
  );
};

export default Index;
