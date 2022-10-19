import { Category } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminLayout, ButtonLink } from "components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
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

const defaultPage = 1;
const defaultLimit = 10;
const defaultOrderBy = "createdAt";
const defaultSortOrder = "desc";

const removeUndefined = (obj: Record<string, string | number | undefined>) =>
  Object.fromEntries(Object.entries(obj).filter(([, val]) => val != undefined));

const Index = () => {
  const router = useRouter();
  const [page, setPage] = useState(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [limit, setLimit] = useState(
    router.query.page ? parseInt(router.query.limit as string) : 10
  );
  const [orderBy, setOrderBy] = useState(
    router.query.orderBy ? (router.query.orderBy as string) : "createdAt"
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
    return "desc";
  });

  const handleQueryChange = (values: {
    page?: number;
    limit?: number;
    sortOrder?: "asc" | "desc";
    orderBy?: string;
  }) => {
    const newPage = values.page || page;
    const newLimit = values.limit || limit;
    const newOrderBy = values.orderBy || orderBy;
    const newSortOrder = values.sortOrder || sortOrder;
    router.push(
      {
        pathname: router.pathname,
        query: removeUndefined({
          page: newPage === defaultPage ? undefined : newPage,
          limit: newLimit === defaultLimit ? undefined : newLimit,
          orderBy: newOrderBy === defaultOrderBy ? undefined : newOrderBy,
          sortOrder:
            newSortOrder === defaultSortOrder ? undefined : newSortOrder,
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

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    "category.getAll",
    { page, limit, orderBy, sortOrder },
  ]);

  const totalPage = useMemo(
    () => Math.ceil((data ? data[0] : 0) / limit),
    [data, limit]
  );

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category</h1>
        <ButtonLink
          href="/admin/categories/create"
          label="Add Category"
          icon={<MdAddCircle size={20} />}
        />
      </div>
      <div className="mt-10  overflow-auto shadow-md sm:rounded-lg">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <CgSpinner size={35} className="animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-2 px-6">
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <button
                          onClick={() => handleSort(header.column.id)}
                          className={`p-2 ${
                            orderBy === header.column.id
                              ? "text-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          {sortOrder === "desc" &&
                          orderBy === header.column.id ? (
                            <FaArrowDown />
                          ) : (
                            <FaArrowUp />
                          )}
                        </button>
                      </div>
                    </th>
                  ))}
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900  even:dark:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td className="space-x-4 py-4 px-6 text-right">
                    <Link
                      href={`/admin/categories/${row.original.slug}/edit`}
                      passHref
                    >
                      <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Edit
                      </a>
                    </Link>
                    <button
                      onClick={() => onDelete(row.original.id)}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      {data && (
        <nav
          className="flex flex-col items-center justify-between space-y-4 pt-4 md:flex-row"
          aria-label="Table navigation"
        >
          <div className="flex items-center space-x-4">
            <label htmlFor="select-limit" className="text-sm">
              Rows per page
            </label>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(parseInt(e.target.value))}
              name="select-limit"
              className="input-primary"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {(page - 1) * limit + 1}-
                {page * limit > data[0] ? data[0] : page * limit}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {data[0]}
              </span>
            </div>
          </div>
          <ul className="pagination-items inline-flex items-center -space-x-px">
            <li>
              <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            <li>
              <button
                disabled={page >= totalPage}
                onClick={() => handlePageChange(page + 1)}
                className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </AdminLayout>
  );
};

export default Index;
